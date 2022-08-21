import { Word } from '../../../constants/types';
import { getHTMLElementContent, setHTMLElementContent } from '../../../utils/handleHTMLTextContent';
import listenLevelButtons, { listerStartButton } from './events';

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

export function sprintGameControls(data: Word[]): void {
    startTimer();
}
