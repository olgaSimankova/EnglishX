import { CHOOSE_LEVEL, START, START_GAME_LABELS } from '../../../constants/constants';
import { Levels } from '../../../constants/types';
import createElement from '../../../utils/createElement';
import renderGameButtons from '../renderGameControlButtons';

function renderUpperBlock(parentElement: HTMLElement, tag: string): void {
    const upperContainer = createElement({
        type: 'div',
        parentElement,
        classes: ['upper-container'],
    });
    createElement({
        type: 'h2',
        parentElement: upperContainer,
        classes: [`${tag}-title`, 'text-center'],
        text: START_GAME_LABELS.sprint.header,
    });
    createElement({
        type: 'p',
        parentElement: upperContainer,
        classes: [`${tag}-description`, 'text-center'],
        text: START_GAME_LABELS.sprint.description,
    });
}

function renderLowerBlock(parentElement: HTMLElement, tag: string): void {
    const lowerContainer = createElement({
        type: 'div',
        parentElement,
        classes: ['lower-container'],
    });
    createElement({
        type: 'p',
        parentElement: lowerContainer,
        classes: [`${tag}-description`, 'text-center'],
        text: CHOOSE_LEVEL,
    });
    const levelsContainer = createElement({
        type: 'div',
        parentElement: lowerContainer,
        classes: ['level-container'],
    });
    const levels = Object.keys(Levels).filter((v) => Number.isNaN(Number(v)));
    levels.forEach((level) => {
        createElement({
            type: 'button',
            parentElement: levelsContainer,
            classes: ['level-button'],
            text: level,
            attributes: [['data', `${level}`]],
        });
    });
    createElement({
        type: 'button',
        parentElement: lowerContainer,
        classes: ['start-button'],
        text: START,
    });
}

function renderStartScreen(parentElement: HTMLElement, tag: string): void {
    const startScreenContainer = createElement({
        type: 'div',
        parentElement,
        classes: ['start-screen'],
    });
    renderUpperBlock(startScreenContainer, tag);
    renderLowerBlock(startScreenContainer, tag);
}

export default function renderGameStartPage(tag: string): void {
    const wrapper = createElement({
        type: 'div',
        parentElement: document.body,
        classes: ['wrapper'],
    });
    const container = createElement({
        type: 'div',
        parentElement: wrapper,
        classes: [`${tag}-container`, 'game-background'],
    });
    renderGameButtons(container);
    renderStartScreen(container, tag);
}
