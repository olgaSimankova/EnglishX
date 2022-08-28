import getWords from '../../api/words';
import { Word } from '../../constants/types';
import state from '../../state/state';
import { getAllAudios, playAllAudio } from '../../utils/playAudio';
import { getWordData, getWordsCards } from '../../view/pages/textbook/createTextbookPage';
import getPaginationBtns from './utils/createPagination';

function updateWordData(word: Word) {
    const wordData = document.querySelector('.word__detail') as HTMLElement;
    wordData.innerHTML = '';
    getWordData(word, wordData);
}

export async function updateWordsContainer() {
    state.textBook.wordsOnPage = await getWords(state.textBook.currentLevel, state.textBook.currentPage - 1);
    const wordsContainer = document.querySelector('.words__contaiter') as HTMLElement;
    wordsContainer.innerHTML = '';
    getWordsCards(state.textBook.wordsOnPage, wordsContainer);
    updateWordData(state.textBook.wordsOnPage[0]);
}

function updateLevelColor(): void {
    const levelsCards = document.querySelectorAll('.level__button') as NodeListOf<Element>;
    levelsCards.forEach((card) => {
        if (card.id === `${state.textBook.currentLevel}`) {
            card.classList.toggle('active', true);
        } else {
            card.classList.toggle('active', false);
        }
    });
    const pagination = document.querySelector('.pagination') as HTMLElement;
    pagination.innerHTML = '';
    getPaginationBtns(pagination);
}

function updateWordsColor(): void {
    const wordCards = document.querySelectorAll('.words__card') as NodeListOf<Element>;
    wordCards.forEach((card) => {
        if (card.id === `${state.textBook.currentWordId}`) {
            card.classList.toggle('active', true);
        } else {
            card.classList.toggle('active', false);
        }
    });
}

export function listenWordCards() {
    const cardsContainer = document.querySelector('.words__contaiter') as HTMLElement;
    cardsContainer.addEventListener('click', (event: Event) => {
        const btn = (event.target as HTMLElement).closest('.words__card');
            if (btn) {
                state.textBook.currentWordId = btn.id;
                updateWordData(state.textBook.wordsOnPage[+btn.id]);
                updateWordsColor();
            }
        })
}

export function listenLevelCards() {
    const levelsCards = document.querySelectorAll('.level__button') as NodeListOf<Element>;
    levelsCards.forEach((card) =>
        card.addEventListener('click', async () => {
            state.textBook.currentLevel = +card.id;
            state.textBook.currentPage = 1;
            updateLevelColor();
            await updateWordsContainer();
        })
    );
}

export function listenTextbookAudio() {
    const audioBtn = document.querySelector('.audio') as HTMLElement;
    audioBtn.addEventListener('click', () => {
        const audios = getAllAudios();
        playAllAudio(...audios);
    });
}
