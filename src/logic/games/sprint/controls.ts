import { Word } from '../../../constants/types';
import state from '../../../state/state';
import { getHTMLElementContent, setHTMLElementContent } from '../../../utils/handleHTMLTextContent';
import listenLevelButtons, { listenChoiceButtons, listerStartButton } from './events';

export default function sprintStartPageControls(): void {
    listenLevelButtons();
    listerStartButton();
}

function startTimer(): void {
    let timeLeft = Number(getHTMLElementContent('clock-counter'));
    const id = setInterval(() => {
        if (timeLeft) {
            timeLeft -= 1;
            setHTMLElementContent('clock-counter', timeLeft.toString());
        } else {
            clearInterval(id);
        }
    }, 1000);
}

export function checkAnswerSprintGame(option: string): boolean {
    const word1 = state.sprintGame.currentEngWord?.wordTranslate;
    const word2 = state.sprintGame.currentRuWord?.wordTranslate;
    return (word1 === word2).toString() === option;
}

export function resetSprintPoints(): void {
    console.log('later');
}

export function setPoints(action: boolean): void {
    console.log('later');
}

export function sprintGameControls(data: Word[]): void {
    startTimer();
    listenChoiceButtons(data);
}
