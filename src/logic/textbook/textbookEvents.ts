import { getWords, getWordStatistics } from '../../api/words';
import { Word, WordStatus } from '../../constants/types';
import state from '../../state/state';
import { initDefaultGamesStats } from '../../utils/handleGameStatObjects';
import { getAllAudios, playAllAudio } from '../../utils/playAudio';
import { getWordData, getWordsCards } from '../../view/pages/textbook/createTextbookPage';
import getPaginationBtns from './utils/createPagination';

async function updateWordData(word: Word) {
    const wordData = document.querySelector('.word__detail') as HTMLElement;
    wordData.innerHTML = '';
    const data = await getWordStatistics(word.id);
    getWordData(word, wordData, data?.optional?.games || initDefaultGamesStats());
}

function findWordInCategory(engWord: string): WordStatus {
    let wordStatus = WordStatus.weak;
    Object.values(WordStatus).forEach((status) => {
        if (
            state.user.aggregatedWords?.[status]?.some((word) => {
                return word.word === engWord;
            })
        ) {
            wordStatus = status;
        }
    });
    return wordStatus;
}

export function setDifficultyToCard(): void {
    const cards = document.querySelectorAll('.words__card');
    cards.forEach((card) => {
        const engWord = card.childNodes[0].textContent;
        if (engWord) {
            const status = findWordInCategory(engWord);
            card.classList.add(status === WordStatus.hard ? 'difficult' : 'words__card');
            card.classList.add(status === WordStatus.hard ? 'learnt' : 'words__card');
        }
    });
}

export async function updateWordsContainer() {
    state.textBook.wordsOnPage = await getWords(state.textBook.currentLevel, state.textBook.currentPage - 1);
    const wordsContainer = document.querySelector('.words__contaiter') as HTMLElement;
    wordsContainer.innerHTML = '';
    getWordsCards(state.textBook.wordsOnPage, wordsContainer);
    updateWordData(state.textBook.wordsOnPage[0]);
    setDifficultyToCard();
}

function updateLevelColor(): void {
    const levelsCards = document.querySelectorAll('.level__button');
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
        if (card.id === `${state.textBook.currentWordNo}`) {
            card.classList.toggle('active', true);
        } else {
            card.classList.toggle('active', false);
        }
    });
}

export const wordListenerCallback = (event: Event) => {
    const btn = (event.target as HTMLElement).closest('.words__card');
    if (btn) {
        state.textBook.currentWordNo = btn.id;
        updateWordData(state.textBook.wordsOnPage[+btn.id]);
        updateWordsColor();
    }
};

export function listenWordCards() {
    const cardsContainer = document.querySelector('.words__contaiter') as HTMLElement;
    cardsContainer.addEventListener('click', wordListenerCallback);
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
