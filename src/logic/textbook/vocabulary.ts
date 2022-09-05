import { toggleActivePage } from './utils/isWordsAvailableForGame';
import { getUserAggregatedWords, getWords, getWordStatistics, setUserWordStats } from '../../api/words';
import { CATEGORIES_BRIDGE, GAMES_LINKS, WORD_CATEGORIES } from '../../constants/constants';
import { Word, WordStatus, WordStats, AggregatedResponse, aggregatedWords, WordActions } from '../../constants/types';
import state from '../../state/state';
import { initDefaultGamesStats } from '../../utils/handleGameStatObjects';
import { getWordData, getWordsCards } from '../../view/pages/textbook/createTextbookPage';
import { listenWordCards, setDifficultyToCard, updateWordsContainer, wordListenerCallback } from './textbookEvents';
import toggleClassActiveButton from './utils/toggleActiveClass';
import getWordIdByName from './utils/getWordAttributes';

export function renderQuantityOfStatusWords(): void {
    WORD_CATEGORIES.forEach((category) => {
        const cls = category.split(' ').join('').toLocaleLowerCase();
        const el = document.querySelector(`.${cls}`);
        const status = CATEGORIES_BRIDGE[category as keyof typeof CATEGORIES_BRIDGE];
        if (el) {
            el.textContent = `Words: ${state.user.aggregatedWords?.[status as keyof aggregatedWords]?.length || 0}`;
        }
    });
}

const updateVocabularyWordsSection = async (words: Word[]) => {
    const wordsContainer = document.querySelector('.words__contaiter') as HTMLElement;
    const wordsDetail = document.querySelector('.word__detail') as HTMLElement;
    wordsContainer.innerHTML = '';
    wordsDetail.innerHTML = '';
    wordsContainer.removeEventListener('click', wordListenerCallback);
    getWordsCards(words, wordsContainer);
    if (words.length) {
        getWordData(words[0], wordsDetail);
    }
    listenWordCards();
    setDifficultyToCard();
};

export function makeGamesInactive(flag: boolean): void {
    const games = document.querySelectorAll('.game');
    games.forEach((game, i) => {
        game.classList.toggle('inactive', flag);
        game.setAttribute('href', flag ? '#' : GAMES_LINKS[i]);
    });
}

export async function setWordsToContainer(status: WordStatus): Promise<void> {
    state.textBook.currentWordStatus = status;
    const currentWords = state.user.aggregatedWords?.[status] || [];
    const { currentWordStatus } = state.textBook;
    if (!currentWords.length || currentWordStatus === WordStatus.deleted || currentWordStatus === WordStatus.learned) {
        makeGamesInactive(true);
    } else {
        makeGamesInactive(false);
    }
    await updateVocabularyWordsSection(currentWords);
    const id = Object.entries(CATEGORIES_BRIDGE).filter((el) => el[1] === status)[0][0];
    toggleClassActiveButton('word_category_button', id);
    state.textBook.currentWordNo = '0';
}

export function showHidePagination() {
    const pagination = document.querySelector('.pagination_wrapper') as HTMLElement;
    pagination.classList.toggle('hidden', state.textBook.view === 'vocabulary');
}

export const listenTextbookTitleView = () => {
    const headingContainer = document.querySelector('.heading_section') as HTMLElement;
    headingContainer.addEventListener('click', async (event: Event) => {
        const textbookBtn = headingContainer.querySelector('#textbook') as HTMLElement;
        const vocabularyBtn = headingContainer.querySelector('#vocabulary') as HTMLElement;
        const wordCategories = document.querySelector('.word_categories_container') as HTMLElement;
        if (event.target === textbookBtn) {
            state.textBook.view = 'textbook';
            state.textBook.wordsOnPage = await getWords(state.textBook.currentLevel, state.textBook.currentPage - 1);
            await updateVocabularyWordsSection(state.textBook.wordsOnPage);
            makeGamesInactive(false);
            toggleActivePage();
        } else if (event.target === vocabularyBtn) {
            state.textBook.view = 'vocabulary';
            setWordsToContainer(WordStatus.weak);
            toggleActivePage(true);
        }
        showHidePagination();
        vocabularyBtn.classList.toggle('active', event.target === vocabularyBtn);
        textbookBtn.classList.toggle('active', event.target === textbookBtn);
        wordCategories.classList.toggle('hidden', state.textBook.view === 'textbook');
        renderQuantityOfStatusWords();
    });
};

async function changeWordStatus(wordId: string, newStatus: WordStatus): Promise<void> {
    const currentStats = await getWordStatistics(wordId);
    delete currentStats?.id;
    delete currentStats?.wordId;
    if (!currentStats || (currentStats && !currentStats.optional?.games)) {
        const opt: WordStats = {
            difficulty: newStatus,
            optional: {
                games: initDefaultGamesStats(),
            },
        };
        setUserWordStats(wordId, opt);
    } else if (currentStats.optional?.games && newStatus === WordStatus.hard) {
        currentStats.optional.games.audioCallGame.streak = 0;
        currentStats.optional.games.sprintGame.streak = 0;
        currentStats.difficulty = newStatus;
        setUserWordStats(wordId, currentStats, true);
    } else if (currentStats.optional?.games && (newStatus === WordStatus.weak || newStatus === WordStatus.learned)) {
        currentStats.difficulty = newStatus;
        setUserWordStats(wordId, currentStats, true);
    } else if (newStatus === WordStatus.deleted) {
        const opt: WordStats = {
            difficulty: newStatus,
            optional: {
                games: initDefaultGamesStats(),
            },
        };
        setUserWordStats(wordId, opt, true);
    }
}

function handlePaginationResult(data: AggregatedResponse): Word[] {
    const output: Word[] = [];
    Object.values(data).forEach((el) => {
        output.push(...el.paginatedResults);
    });
    return output;
}

export async function fillStateWithAllUserWords(): Promise<void> {
    await Promise.all(
        Object.values(WordStatus).map(async (wordStatus) => {
            const filter = encodeURIComponent(JSON.stringify({ 'userWord.difficulty': wordStatus }));
            const words = await getUserAggregatedWords(state.textBook.currentLevel, filter);
            if (words && state.user.aggregatedWords) {
                state.user.aggregatedWords[wordStatus] = handlePaginationResult(words);
            }
        })
    );
}

export async function listenWordActionsButtons(): Promise<void> {
    const wordActions = document.querySelector('.word__actions') as HTMLElement;
    wordActions.addEventListener('click', async (event: Event) => {
        const button = (event.target as HTMLElement).id;
        if (button) {
            const { currentWordNo } = state.textBook;
            const cards = Array.from((document.querySelector('.words__contaiter') as HTMLElement).children);
            const currentStatus = state.textBook.currentWordStatus;
            const currentWords = state.user.aggregatedWords?.[currentStatus];
            switch (button) {
                case WordActions.difficult:
                    cards[+currentWordNo].classList.toggle('difficult', true);
                    cards[+currentWordNo].classList.toggle('learnt', false);
                    await changeWordStatus(state.textBook.wordsOnPage[+currentWordNo].id, WordStatus.hard);
                    await fillStateWithAllUserWords();
                    break;
                case WordActions.delete:
                    await changeWordStatus(state.textBook.wordsOnPage[+currentWordNo].id, WordStatus.deleted);
                    await fillStateWithAllUserWords();
                    await updateWordsContainer();
                    break;
                case WordActions.learnt:
                    cards[+currentWordNo].classList.toggle('difficult', false);
                    cards[+currentWordNo].classList.toggle('learnt', true);
                    await changeWordStatus(state.textBook.wordsOnPage[+currentWordNo].id, WordStatus.learned);
                    await fillStateWithAllUserWords();
                    break;
                case 'restore_word':
                    if (currentWords) {
                        await changeWordStatus(
                            getWordIdByName(currentWords, currentWords[+currentWordNo].word),
                            WordStatus.weak
                        );
                        await fillStateWithAllUserWords();
                        await setWordsToContainer(currentStatus);
                    }
                    break;
                default:
                    break;
            }
            renderQuantityOfStatusWords();
        }
    });
}

export function listenVocabularyCategories() {
    const categories = document.querySelector('.word_categories_container') as HTMLElement;
    categories.addEventListener('click', (event: Event) => {
        const target = event.target as HTMLElement;
        const { id } = target.id ? target : (target.parentNode as HTMLElement);
        if (id) {
            toggleClassActiveButton('word_category_button', id);
            const currentWordStatus = CATEGORIES_BRIDGE[id as keyof typeof CATEGORIES_BRIDGE];
            state.textBook.currentWordStatus = WordStatus[currentWordStatus as keyof typeof WordStatus];
            setWordsToContainer(state.textBook.currentWordStatus);
            state.textBook.currentWordNo = '0';
        }
    });
}
