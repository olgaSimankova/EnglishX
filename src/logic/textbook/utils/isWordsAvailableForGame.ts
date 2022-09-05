import { WordStatus } from '../../../constants/types';
import state from '../../../state/state';
import { setLocalStorage } from '../../../utils/localStorage';
import { findWordInCategory } from '../textbookEvents';
import { makeGamesInactive } from '../vocabulary';

export default function isWordsAvailableForGame(): boolean {
    return state.textBook.wordsOnPage.some((word) => {
        const currentWordStatus = findWordInCategory(word.word);
        return currentWordStatus === WordStatus.weak;
    });
}

export function toggleActivePage(flag = false): void {
    const paginationBtn = document.querySelector('.pagination_element > .active')?.parentNode;
    const wordsSection = document.querySelector('.words__section');
    const title = document.querySelector('.words_title');
    const gameElements = [paginationBtn, wordsSection, title];
    let isAvailable = isWordsAvailableForGame();
    setLocalStorage('isFromTextBook', !isAvailable ? 'true' : 'false');
    if (flag) {
        isAvailable = true;
    }
    makeGamesInactive(!isAvailable);
    gameElements.forEach((el) => (el as HTMLElement).classList.toggle('inactive', !isAvailable));
}
