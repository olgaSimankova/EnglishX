import {
    DELIMITOR,
    MULTIPLY,
    POINTS,
    SPRINT_START_TIME,
    START_POINTS,
    TRUE_FALSE_OBJ,
} from '../../../../constants/constants';
import { Word } from '../../../../constants/types';
import createElement from '../../../../utils/createElement';

function renderClockBlock(parentElement: HTMLElement): void {
    createElement({
        type: 'div',
        parentElement,
        classes: ['clock'],
    });
    createElement({
        type: 'p',
        parentElement,
        classes: ['clock-counter'],
        text: SPRINT_START_TIME.toString(),
    });
}

function renderPointsBlock(parentElement: HTMLElement): void {
    const pointsContainer = createElement({
        type: 'div',
        parentElement,
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

function renderTickBlock(parentElement: HTMLElement): void {
    const tickContainer = createElement({
        type: 'div',
        parentElement,
        classes: ['tick-container'],
    });
    const tick = createElement({
        type: 'div',
        parentElement: tickContainer,
        classes: ['tick'],
    });
    createElement({
        type: 'div',
        parentElement: tick,
        classes: ['answers-queue'],
        text: '3',
    });
}

function renderAnswerBlock(parentElement: HTMLElement): void {
    const answerContainer = createElement({
        type: 'div',
        parentElement,
        classes: ['answer-container'],
    });
    createElement({
        type: 'p',
        parentElement: answerContainer,
        classes: ['eng-word', 'word'],
        text: 'eng-word',
    });
    createElement({
        type: 'p',
        parentElement: answerContainer,
        classes: ['delimiter'],
        text: DELIMITOR,
    });
    createElement({
        type: 'p',
        parentElement: answerContainer,
        classes: ['ru-word', 'word'],
        text: 'ru-word',
    });
    createElement({
        type: 'p',
        parentElement: answerContainer,
        classes: ['delimiter'],
        text: '?',
    });
}

function renderButtonsBlock(parentElement: HTMLElement): void {
    const buttonsContainer = createElement({
        type: 'div',
        parentElement,
        classes: ['buttons-container'],
    });
    Object.keys(TRUE_FALSE_OBJ).forEach((key) => {
        createElement({
            type: 'button',
            parentElement: buttonsContainer,
            classes: ['answer-button', `${key}-button`],
            text: TRUE_FALSE_OBJ[key as keyof typeof TRUE_FALSE_OBJ],
        });
    });
}

export function setAnswerBlock(data: Word[]): void {
    const engWord = document.querySelector('.eng-word');
    const ruWord = document.querySelector('.ru-word');
    //stooped here
}

export default function renderSprintGame(parentElement: HTMLElement, data: Word[]): void {
    const gameContainer = createElement({
        type: 'div',
        parentElement,
        classes: ['game-container'],
    });
    console.log(data);
    renderClockBlock(gameContainer);
    renderPointsBlock(gameContainer);
    renderTickBlock(gameContainer);
    renderAnswerBlock(gameContainer);
    renderButtonsBlock(gameContainer);
    setAnswerBlock(data);
}
