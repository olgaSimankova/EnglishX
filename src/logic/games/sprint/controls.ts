import { START_POINTS } from '../../../constants/constants';
import { Word } from '../../../constants/types';
import state from '../../../state/state';
import { deleteHTMLElement } from '../../../utils/createElement';
import { getHTMLElementContent, setHTMLElementContent } from '../../../utils/handleHTMLTextContent';
import renderResultSprintPage from '../../../view/common/gameResult/renderGameResults';
import listenLevelButtons, { listenChoiceButtons, listenResultTabs, listerStartButton } from './events';

export default function sprintStartPageControls(): void {
    listenLevelButtons();
    listerStartButton();
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
            listenResultTabs();
        }
    }, 1000);
}

export function checkAnswerSprintGame(option: string): boolean {
    const word1 = state.sprintGame.currentEngWord?.wordTranslate;
    const word2 = state.sprintGame.currentRuWord?.wordTranslate;
    return (word1 === word2).toString() === option;
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
    } else {
        state.sprintGame.currentTick = 1;
        state.sprintGame.currentMultiply = 1;
    }
    updateViewPoints();
    unpdateWordsResult(action);
}

export function sprintGameControls(data: Word[]): void {
    startTimer();
    listenChoiceButtons(data);
}

export function sprintResultsControls(): void {
    listenResultTabs();
}
