import { getUserAggregatedWords, getWordStatistics, setUserWordStats } from '../../api/words';
import { Word, WordStatus, WordStats } from '../../constants/types';
import state from '../../state/state';
import { initDefaultGamesStats } from '../../utils/handleGameStatObjects';
import { getWordData, getWordsCards } from '../../view/pages/textbook/createTextbookPage';
import { listenWordCards } from './textbookEvents';

export function showHidePagination() {
    const pagination = document.querySelector('.pagination_wrapper') as HTMLElement;
    pagination.classList.toggle('hidden', state.textBook.view === 'vocabulary');
}

export const listenTextbookTitleView = () => {
    const headingContainer = document.querySelector('.heading_section') as HTMLElement;
    headingContainer.addEventListener('click', (event: Event) => {
        const textbookBtn = headingContainer.querySelector('#textbook') as HTMLElement;
        const vocabularyBtn = headingContainer.querySelector('#vocabulary') as HTMLElement;
        const wordCategories = document.querySelector('.word_categories_container') as HTMLElement;
        if (event.target === textbookBtn) {
            state.textBook.view = 'textbook';
        } else if (event.target === vocabularyBtn) {
            state.textBook.view = 'vocabulary';
        }
        showHidePagination();
        vocabularyBtn.classList.toggle('active', event.target === vocabularyBtn);
        textbookBtn.classList.toggle('active', event.target === textbookBtn);
        wordCategories.classList.toggle('hidden', state.textBook.view === 'textbook');
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

export const listenDifficultWordBtn = () => {
    const btn = document.querySelector('#add_difficult_word') as HTMLElement;
    btn.addEventListener('click', async () => {
        const { currentWordNo } = state.textBook;
        const cards = Array.from((document.querySelector('.words__contaiter') as HTMLElement).children);
        cards[+currentWordNo].classList.toggle('difficult', true);
        changeWordStatus(state.textBook.wordsOnPage[+currentWordNo].id, WordStatus.hard);
        const filter = encodeURIComponent(JSON.stringify({ 'userWord.difficulty': 'hard' }));
        console.log(await getUserAggregatedWords(state.textBook.currentLevel, filter));
    });
};

export const updateVocabularyWordsSection = (words: Word[]) => {
    const wordsSection = document.querySelector('.words__section') as HTMLElement;
    wordsSection.innerHTML = '';
    getWordsCards(words, wordsSection);
    getWordData(words[0], wordsSection);
    listenWordCards();
};

// export function fillStateWithAllUserWords() {
//     Object.values(WordStatus).forEach(async (wordStatus) => {
//         const filter = encodeURIComponent(JSON.stringify({ 'userWord.difficulty': wordStatus }));
//         const words = await getUserAggregatedWords(state.textBook.currentLevel, filter);
//         if (words) {
//             state.user.aggregatedWords![wordStatus] = words[0].paginatedResults;
//             console.log(words[0].paginatedResults);
//             console.log(words[0].totalCount);
//         }
//     });
// }

export function listenVocabularyCategories() {
    const categories = document.querySelector('.word_categories_container') as HTMLElement;
    categories.addEventListener('click', (event: Event) => {
        if ((event.target as HTMLElement).classList.contains('word_category_button')) {
            // const wordCategory = (event.target as HTMLElement).dataset.id as keyof WordStatus;
            if (state.user.aggregatedWords) {
                // fillStateWithAllUserWords();
                const words = state.user.aggregatedWords.hard;
                updateVocabularyWordsSection(words || []);
            }
        }
    });
}
