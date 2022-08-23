import { START_POINTS } from '../../../constants/constants';
import { Choice, Word } from '../../../constants/types';
import state from '../../../state/state';
import { deleteHTMLElement } from '../../../utils/createElement';
import { getHTMLElementContent, setHTMLElementContent } from '../../../utils/handleHTMLTextContent';
import { playChoiceSound } from '../../../utils/playAudio';
import renderResultSprintPage from '../../../view/common/gameResult/renderGameResults';
import { setAnswerBlock } from '../../../view/pages/games/sprint/renderSprintGame';
import listenLevelButtons, {
    listenChoiceButtons,
    listenKeyboard,
    listenResultBottomButtons,
    listenResultTabs,
    listenSoundResultList,
    listerStartButton,
} from './events';

export default function sprintStartPageControls(): void {
    listenLevelButtons();
    listerStartButton();
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
            deleteHTMLElement('game-container');
            renderResultSprintPage(
                'sprint-container',
                state.sprintGame.currentLearned,
                state.sprintGame.currentMistakes
            );
            gameResultControls();
        }
    }, 1000);
}

export function checkAnswerSprintGame(option: string): boolean {
    const isTrue = option === 'YES';
    const word1 = state.sprintGame.currentEngWord?.wordTranslate;
    const word2 = state.sprintGame.currentRuWord?.wordTranslate;
    return (word1 === word2) === isTrue;
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
    console.log('later');
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

export function choiceAction(e: Event, data: Word[]): void {
    const target = e.target as HTMLElement;
    const value = target.getAttribute('data');
    if (value && state.sprintGame.wordsLearnt < data.length) {
        const action = checkAnswerSprintGame(value);
        setPoints(action);
        setAnswerBlock(data);
        state.sprintGame.wordsLearnt += 1;
    } else {
        state.sprintGame.isGame = false;
    }
}
