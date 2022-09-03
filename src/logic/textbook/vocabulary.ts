import { getWordStatistics, setUserWordStats } from '../../api/words';
import { WordStats, WordStatus } from '../../constants/types';
import state from '../../state/state';
import { initDefaultGamesStats } from '../../utils/handleGameStatObjects';

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
    btn.addEventListener('click', () => {
        const { currentWordNo } = state.textBook;
        const cards = Array.from((document.querySelector('.words__contaiter') as HTMLElement).children);
        cards[+currentWordNo].classList.toggle('difficult', true);
        changeWordStatus(state.textBook.wordsOnPage[+currentWordNo].id, WordStatus.hard);
    });
};
