import { MULTIPLY, POINTS, SPRINT_START_TIME, START_POINTS } from '../../../../constants/constants';
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
    const pointsContainer = createElement({
        type: 'div',
        parentElement: gameContainer,
        classes: ['points-container'],
    });
    const multiplyContainer = createElement({
        type: 'div',
        parentElement: pointsContainer,
        classes: ['multiply-container'],
    });
    createElement({
        type: 'p',
        parentElement: multiplyContainer,
        classes: ['multiply-label', 'label'],
        text: `${MULTIPLY}: X`,
    });
    createElement({
        type: 'p',
        parentElement: multiplyContainer,
        classes: ['multiply-label', 'label', 'coefficient'],
        text: '1',
    });
    createElement({
        type: 'p',
        parentElement: multiplyContainer,
        classes: ['multiply-label', 'label', 'plus'],
        text: `+${START_POINTS}`,
    });
    const resultContainer = createElement({
        type: 'div',
        parentElement: pointsContainer,
        classes: ['result-container'],
    });
    createElement({
        type: 'p',
        parentElement: resultContainer,
        classes: ['result-label', 'label'],
        text: POINTS,
    });
    createElement({
        type: 'p',
        parentElement: resultContainer,
        classes: ['result-label', 'label', 'result'],
        text: '0',
    });
}
