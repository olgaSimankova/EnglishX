import { getUserAggregatedWords, getWordStatistics, setUserWordStats } from '../../api/words';
import { CATEGORIES_BRIDGE, WORD_CATEGORIES } from '../../constants/constants';
import { Word, WordStatus, WordStats, AggregatedResponse, aggregatedWords } from '../../constants/types';
import state from '../../state/state';
import { initDefaultGamesStats } from '../../utils/handleGameStatObjects';
import { getWordData, getWordsCards } from '../../view/pages/textbook/createTextbookPage';
import toggleWordActions from './utils/toggleWordActions';
import { listenWordCards, setDifficultyToCard, wordListenerCallback } from './textbookEvents';
import toggleClassActiveButton from './utils/toggleActiveClass';

export function renderQuantityOfStatusWords(): void {
    console.log('render');
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
    toggleWordActions();
};

export const listenTextbookTitleView = () => {
    const headingContainer = document.querySelector('.heading_section') as HTMLElement;
    headingContainer.addEventListener('click', async (event: Event) => {
        const textbookBtn = headingContainer.querySelector('#textbook') as HTMLElement;
        const vocabularyBtn = headingContainer.querySelector('#vocabulary') as HTMLElement;
        const wordCategories = document.querySelector('.word_categories_container') as HTMLElement;
        if (event.target === textbookBtn) {
            state.textBook.view = 'textbook';
        } else if (event.target === vocabularyBtn) {
            state.textBook.view = 'vocabulary';
        }
        await updateVocabularyWordsSection(state.textBook.wordsOnPage);
        vocabularyBtn.classList.toggle('active', event.target === vocabularyBtn);
        textbookBtn.classList.toggle('active', event.target === textbookBtn);
        wordCategories.classList.toggle('hidden', state.textBook.view === 'textbook');
        toggleWordActions();
        renderQuantityOfStatusWords();
    });
};

async function changeWordStatus(wordId: string, newStatus: WordStatus): Promise<void> {
    const currentStats = await getWordStatistics(wordId);
    delete currentStats?.id;
    delete currentStats?.wordId;
    if (
        !currentStats ||
        (currentStats && !currentStats.optional?.games) ||
        (currentStats.optional?.games && newStatus === WordStatus.deleted)
    ) {
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
    } else if (currentStats.optional?.games && newStatus === WordStatus.weak) {
        currentStats.difficulty = newStatus;
        setUserWordStats(wordId, currentStats, true);
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

export const listenDifficultWordBtn = () => {
    const btn = document.querySelector('#add_difficult_word') as HTMLElement;
    btn.addEventListener('click', async () => {
        const { currentWordNo } = state.textBook;
        const cards = Array.from((document.querySelector('.words__contaiter') as HTMLElement).children);
        cards[+currentWordNo].classList.toggle('difficult', true);
        await changeWordStatus(state.textBook.wordsOnPage[+currentWordNo].id, WordStatus.hard);
        await fillStateWithAllUserWords();
        setTimeout(renderQuantityOfStatusWords, 2000); // server needs time to filter words
    });
};

export function listenVocabularyCategories() {
    const categories = document.querySelector('.word_categories_container') as HTMLElement;
    categories.addEventListener('click', (event: Event) => {
        const target = event.target as HTMLElement;
        const { id } = target.id ? target : (target.parentNode as HTMLElement);
        if (id) {
            toggleClassActiveButton('word_category_button', id);
            const words =
                state.user.aggregatedWords?.[
                    CATEGORIES_BRIDGE[id as keyof typeof CATEGORIES_BRIDGE] as keyof aggregatedWords
                ];
            updateVocabularyWordsSection(words || []);
            toggleWordActions();
        }
    });
}
