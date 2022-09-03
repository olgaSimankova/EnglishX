import { CHOOSE_LEVEL, START, START_GAME_LABELS } from '../../../constants/constants';
import { Levels } from '../../../constants/types';
import gameButtonsControls from '../../../logic/games/gameButtonsControls';
import createElement from '../../../utils/createElement';
import renderGameButtons from '../renderGameControlButtons';
import './startGame.scss';
import '../../pages/main/scss/style.scss';

function renderUpperBlock(parentElement: HTMLElement, tag: string): void {
    const upperContainer = createElement({
        type: 'div',
        parentElement,
        classes: ['upper-container'],
    });
    createElement({
        type: 'h2',
        parentElement: upperContainer,
        classes: ['game-title', 'text-center'],
        text: START_GAME_LABELS[tag as keyof typeof START_GAME_LABELS].header,
    });
    createElement({
        type: 'p',
        parentElement: upperContainer,
        classes: ['game-description', 'text-center'],
        text: START_GAME_LABELS[tag as keyof typeof START_GAME_LABELS].description,
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
        classes: ['game-description', 'text-center'],
        text: CHOOSE_LEVEL,
    });
    const levelsContainer = createElement({
        type: 'div',
        parentElement: lowerContainer,
        classes: ['level-container'],
    });
    const levels = Object.keys(Levels).filter((v) => Number.isNaN(Number(v)));
    levels.forEach((level, index) => {
        createElement({
            type: 'button',
            parentElement: levelsContainer,
            classes: ['level-button', `level-button_${index}`],
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
    renderLowerBlock(startScreenContainer);
}

const renderAnimationLayer = (parentElement: HTMLElement) => {
    const area = createElement({
        type: 'div',
        parentElement,
        classes: ['area'],
    });

    const circles = createElement({
        type: 'ul',
        parentElement: area,
        classes: ['circles'],
    });

    for (let i = 0; i < 10; i += 1) {
        createElement({
            type: 'li',
            parentElement: circles,
        });
    }
};

export default function renderGameStartPage(tag: string): void {
    const { background } = START_GAME_LABELS[tag as keyof typeof START_GAME_LABELS];
    document.body.classList.add(background);

    renderAnimationLayer(document.body);

    const wrapper = createElement({
        type: 'div',
        parentElement: document.body,
        classes: ['wrapper'],
    });
    const container = createElement({
        type: 'div',
        parentElement: wrapper,
        classes: ['game-container', 'game-background'],
    });
    renderGameButtons(container);
    renderStartScreen(container, tag);
    gameButtonsControls();
}
