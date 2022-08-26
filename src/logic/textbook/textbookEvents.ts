import { getWord, getWords } from '../../api/words';
import { Word } from '../../constants/types';
import state from '../../state/state';
import { getWordData, getWordsCards } from '../../view/pages/textbook/createTextbookPage';
import { getPaginationBtns } from './pagination';

async function updateWordData(word?: Word) {
    if (!word) word = await getWord(state.textBook.currentWordId);
    console.log(word);
    const wordData = document.querySelector('.word__detail') as HTMLElement;
    wordData.innerHTML = '';
    getWordData(word, wordData);
}

export async function updateWordsContainer() {
    const words = await getWords(state.textBook.currentLevel, state.textBook.currentPage - 1);
    const wordsContainer = document.querySelector('.words__contaiter') as HTMLElement;
    wordsContainer.innerHTML = '';
    getWordsCards(words, wordsContainer);
    updateWordData(words[0]);
}

function updateLevelColor() {
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

export function listenWordCards() {
    const cardsContainer = document.querySelector('.words__contaiter') as HTMLElement;
    cardsContainer.addEventListener('click', async (event: Event) => {
        if ((event.target as HTMLElement).classList.contains('words__card')) {
            state.textBook.currentWordId = (event.target as HTMLElement).id;
            await updateWordData();
        }
    });
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
