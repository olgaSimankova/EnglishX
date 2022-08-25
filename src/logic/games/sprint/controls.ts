import getWords from '../../../api/words';
import { GAME_BUTTONS, MAX_PAGES, START_POINTS } from '../../../constants/constants';
import { Choice, GameTags, Levels, Word } from '../../../constants/types';
import state from '../../../state/state';
import { deleteHTMLElement } from '../../../utils/createElement';
import { getHTMLElementContent, setHTMLElementContent } from '../../../utils/handleHTMLTextContent';
import { playChoiceSound } from '../../../utils/playAudio';
import getRandomNumber from '../../../utils/randomize';
import renderResultPage from '../../../view/common/gameResult/renderGameResults';
import listenLevelButtons, {
    listenChoiceButtons,
    listenKeyboard,
    listenResultBottomButtons,
    listenResultTabs,
    listenSoundResultList,
    listerStartButton,
} from './events';

function getNewPage(): number {
    const { usedPages } = state.sprintGame;
    if (usedPages.length === MAX_PAGES) {
        return -1;
    }
    let page = getRandomNumber(0, MAX_PAGES);
    while (usedPages.includes(page)) {
        page = getRandomNumber(0, MAX_PAGES);
    }
    return page;
}

export async function getNewData(): Promise<Word[]> {
    const newPage = getNewPage();
    if (newPage === -1) {
        return [];
    }
    console.log(state.sprintGame.currentLevel);
    const level = Levels[state.sprintGame.currentLevel as keyof typeof Levels];
    return getWords(level, newPage);
}

export async function setAnswerBlock(data: Word[]): Promise<void> {
    const { length } = data;
    if (state.sprintGame.usedNumbers.length !== length) {
        let randomNumber = getRandomNumber(0, length);
        while (state.sprintGame.usedNumbers.includes(randomNumber)) {
            randomNumber = getRandomNumber(0, length);
        }
        state.sprintGame.usedNumbers.push(randomNumber);
        const randomEng = data[randomNumber];
        state.sprintGame.currentEngWord = randomEng;
        const randomRu = Math.random() < 0.5 ? randomEng : data[getRandomNumber(0, length)];
        state.sprintGame.currentRuWord = randomRu;
        setHTMLElementContent('eng-word', randomEng.word);
        setHTMLElementContent('ru-word', randomRu.wordTranslate);
    }
}

export default function startPageControls(tag: GameTags, reload = false): void {
    listenLevelButtons();
    listerStartButton(tag, reload);
}

export function gameResultControls(): void {
    listenResultTabs();
    listenSoundResultList();
    listenResultBottomButtons();
}

function startTimer(): void {
    let timeLeft = Number(getHTMLElementContent('clock-counter'));
    const id = setInterval(() => {
        if (timeLeft && state.sprintGame.isGame) {
            timeLeft -= 1;
            setHTMLElementContent('clock-counter', timeLeft.toString());
        } else {
            clearInterval(id);
            deleteHTMLElement('sprint-container');
            renderResultPage('game-container', state.sprintGame.currentLearned, state.sprintGame.currentMistakes);
            gameResultControls();
        }
    }, 1000);
}

export function checkAnswerSprintGame(option: boolean): boolean {
    const word1 = state.sprintGame.currentEngWord?.wordTranslate;
    const word2 = state.sprintGame.currentRuWord?.wordTranslate;
    return (word1 === word2) === option;
}

function increaseScore(): void {
    const { currentTick } = state.sprintGame;
    state.sprintGame.currentPoints += state.sprintGame.currentBet;
    if (currentTick === 3) {
        state.sprintGame.currentTick = 1;
        state.sprintGame.currentMultiply += 1;
        state.sprintGame.currentBet = state.sprintGame.currentMultiply * Number(START_POINTS);
    } else {
        state.sprintGame.currentTick += 1;
    }
}

function updateViewPoints() {
    const { currentTick, currentMultiply, currentPoints } = state.sprintGame;
    setHTMLElementContent('answers-queue', currentTick.toString());
    setHTMLElementContent('coefficient', currentMultiply.toString());
    setHTMLElementContent('result', currentPoints.toString());
    setHTMLElementContent('plus', `+${currentMultiply * Number(START_POINTS)}`);
}

function unpdateWordsResult(action: boolean) {
    const { currentEngWord, currentLearned, currentMistakes, isGame } = state.sprintGame;
    if (currentEngWord && action && isGame) {
        currentLearned.push(currentEngWord);
    } else if (currentEngWord && !action && isGame) {
        currentMistakes.push(currentEngWord);
    }
}

export function resetSprintPoints(): void {
    state.sprintGame.currentBet = 10;
    state.sprintGame.currentPoints = 0;
    state.sprintGame.currentTick = 0;
    state.sprintGame.currentMultiply = 1;
    state.sprintGame.currentLearned = [];
    state.sprintGame.currentMistakes = [];
    state.sprintGame.usedNumbers = [];
    state.sprintGame.wordsLearnt = 0;
}

export function setPoints(action: boolean): void {
    if (action) {
        increaseScore();
        playChoiceSound(Choice.right);
    } else {
        state.sprintGame.currentTick = 1;
        state.sprintGame.currentMultiply = 1;
        playChoiceSound(Choice.wrong);
    }
    updateViewPoints();
    unpdateWordsResult(action);
}

export function sprintGameControls(data: Word[]): void {
    startTimer();
    listenChoiceButtons(data);
    listenKeyboard(data);
}

export function processResultGameButtons(data: string): void {
    switch (data.toLocaleLowerCase()) {
        case 'go':
            window.location.href = './textbook.html';
            break;
        case 'play':
            window.location.href = './sprint.html';
            break;
        default:
            break;
    }
}

export function choiceAction(e: Event, data: Word[], reload = false): void {
    const target = e.target as HTMLElement;
    const value = target.getAttribute('data');
    if (value && state.sprintGame.wordsLearnt < data.length) {
        const action = checkAnswerSprintGame(GAME_BUTTONS[value as keyof typeof GAME_BUTTONS]);
        setPoints(action);
        setAnswerBlock(data);
        state.sprintGame.wordsLearnt += 1;
    } else {
        state.sprintGame.isGame = false;
    }
}
