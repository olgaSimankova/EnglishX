import { SPRINT_START_TIME } from '../../../../constants/constants';
import createElement from '../../../../utils/createElement';

export default function renderSprintGame(parentElement: HTMLElement): void {
    const gameContainer = createElement({
        type: 'div',
        parentElement,
        classes: ['game-container'],
    });
    const clock = createElement({
        type: 'div',
        parentElement: gameContainer,
        classes: ['clock'],
    });
    const clockCount = createElement({
        type: 'p',
        parentElement: gameContainer,
        classes: ['clock-counter'],
        text: SPRINT_START_TIME.toString(),
    });
}
