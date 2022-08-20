import { CHOOSE_LEVEL, SPRINT, SPRINT_GAME_DESCRIPTION, START } from '../../../../constants/constants';
import { Levels } from '../../../../constants/types';
import createElement from '../../../../utils/createElement';

function renderGameButtons(parentElement: HTMLElement): void {
    const gameButtonsContainer = createElement({
        type: 'div',
        parentElement,
        classes: ['game-buttons'],
    });
    const closeLink = createElement({
        type: 'a',
        parentElement: gameButtonsContainer,
        classes: ['link-close'],
        attributes: [['href', '']],
    });
    const spanCloseContainer = createElement({
        type: 'div',
        parentElement: closeLink,
        classes: ['close-span-container'],
    });
    ['first-span', 'second-span'].forEach((span) => {
        createElement({
            type: 'span',
            parentElement: spanCloseContainer,
            classes: ['close-span', span],
        });
    });
    const fullScreenContainer = createElement({
        type: 'div',
        parentElement: gameButtonsContainer,
        classes: ['fullscreen-container'],
    });
    createElement({
        type: 'img',
        parentElement: fullScreenContainer,
        classes: ['fullscreen-svg', 'game-icon'],
    });
    const soundContainer = createElement({
        type: 'div',
        parentElement: gameButtonsContainer,
        classes: ['sound-container'],
    });
    createElement({
        type: 'img',
        parentElement: soundContainer,
        classes: ['sound-svg', 'game-icon'],
    });
}

function renderUpperBlock(parentElement: HTMLElement): void {
    const upperContainer = createElement({
        type: 'div',
        parentElement,
        classes: ['upper-container'],
    });
    createElement({
        type: 'h2',
        parentElement: upperContainer,
        classes: ['sprint-title', 'text-center'],
        text: SPRINT,
    });
    createElement({
        type: 'p',
        parentElement: upperContainer,
        classes: ['sprint-description', 'text-center'],
        text: SPRINT_GAME_DESCRIPTION,
    });
}

function renderLowerBlock(parentElement: HTMLElement): void {
    const lowerContainer = createElement({
        type: 'div',
        parentElement,
        classes: ['lower-container'],
    });
    createElement({
        type: 'p',
        parentElement: lowerContainer,
        classes: ['sprint-description', 'text-center'],
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

function renderStartScreen(parentElement: HTMLElement): void {
    const startScreenContainer = createElement({
        type: 'div',
        parentElement,
        classes: ['start-screen'],
    });
    renderUpperBlock(startScreenContainer);
    renderLowerBlock(startScreenContainer);
}

export default function renderSprint(): void {
    const wrapper = createElement({
        type: 'div',
        parentElement: document.body,
        classes: ['wrapper'],
    });
    const sprintContainer = createElement({
        type: 'div',
        parentElement: wrapper,
        classes: ['sprint-container', 'game-background'],
    });
    renderGameButtons(sprintContainer);
    renderStartScreen(sprintContainer);
}
