import { setUserWordStats } from '../../api/words';
import { WordStatus } from '../../constants/types';
import state from '../../state/state';

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

export const listenDifficultWordBtn = () => {
    const btn = document.querySelector('#add_difficult_word') as HTMLElement;
    btn.addEventListener('click', () => {
        const { currentWordNo } = state.textBook;
        const cards = Array.from((document.querySelector('.words__contaiter') as HTMLElement).children);
        cards[+currentWordNo].classList.toggle('difficult', true);
        setUserWordStats(state.textBook.wordsOnPage[+currentWordNo].id, { difficulty: WordStatus.hard, optional: {} });
    });
};
