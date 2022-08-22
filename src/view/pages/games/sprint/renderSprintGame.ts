import {
    DELIMITOR,
    MULTIPLY,
    POINTS,
    SPRINT_START_TIME,
    START_POINTS,
    TRUE_FALSE_OBJ,
} from '../../../../constants/constants';
import { Word } from '../../../../constants/types';
import { resetSprintPoints } from '../../../../logic/games/sprint/controls';
import state from '../../../../state/state';
import createElement from '../../../../utils/createElement';
import { setHTMLElementContent } from '../../../../utils/handleHTMLTextContent';
import getRandomNumber from '../../../../utils/randomize';

function renderResultTabs(parentElement: HTMLElement): void {
    const tabsContainer = createElement({
        type: 'div',
        parentElement,
        classes: ['tabs-container'],
    });
    ['RESULT', 'WATCH WORDS'].forEach((tag) => {
        createElement({
            type: 'button',
            parentElement: tabsContainer,
            classes: ['tab', `${tag.split(' ')[0]}`.toLocaleLowerCase()],
            text: tag,
        });
    });
    const firstTab = document.querySelector('.tab');
    firstTab?.classList.add('active');
}

function renderPercents(parentElement: HTMLElement, percents: number): void {
    const percentsContainer = createElement({
        type: 'div',
        parentElement,
        classes: ['percents-result-container'],
    });
    createElement({
        type: 'p',
        parentElement: percentsContainer,
        classes: ['big-percents'],
        text: `${percents.toString()}%`,
    });
    createElement({
        type: 'p',
        parentElement: percentsContainer,
        classes: ['percents-description'],
        text: 'Learnt words',
    });
}

function renderResultBottomButtons(parentElement: HTMLElement): void {
    const buttonsContainer = createElement({
        type: 'div',
        parentElement,
        classes: ['bottom-buttons-container'],
    });
    ['Play one more time', 'Go to textbook'].forEach((label) => {
        createElement({
            type: 'button',
            parentElement: buttonsContainer,
            classes: ['bottom-button'],
            text: label,
            attributes: [['data', `${label.split(' ')[0]}`]],
        });
    });
}

export function renderResultSprintPage(): void {
    const sprintContainer = document.querySelector('.sprint-container') as HTMLElement;
    const resultContainer = createElement({
        type: 'div',
        parentElement: sprintContainer,
        classes: ['results-container'],
    });
    renderResultTabs(resultContainer);
    createElement({
        type: 'h2',
        parentElement: resultContainer,
        classes: ['title-result', 'text-center'],
        text: 'Nice one, you are awesome!',
    });
    const { currentLearned, currentMistakes, wordsLearnt } = state.sprintGame;
    const percents = Math.floor((currentLearned.length / wordsLearnt) * 100);
    createElement({
        type: 'p',
        parentElement: resultContainer,
        classes: ['result-description', 'text-center'],
        text: `${wordsLearnt} words trained, ${currentMistakes.length} words need to learn`,
    });
    renderPercents(resultContainer, percents);
    renderResultBottomButtons(resultContainer);
}

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
            attributes: [['data', key]],
        });
    });
}

export function setAnswerBlock(data: Word[]): void {
    const { length } = data;
    if (state.sprintGame.wordsLearnt <= length) {
        state.sprintGame.wordsLearnt += 1;
        let randomNumber = getRandomNumber(0, length);
        while (state.sprintGame.usedNumbers.includes(randomNumber)) {
            randomNumber = getRandomNumber(0, length);
        }
        state.sprintGame.usedNumbers.push(randomNumber);
        const randomEng = data[randomNumber];
        state.sprintGame.currentEngWord = randomEng;
        const randomRu = Math.random() < 0.5 ? randomEng : data[getRandomNumber(0, length)];
        state.sprintGame.currentRuWord = randomRu;
        setHTMLElementContent('eng-word', randomEng.word);
        setHTMLElementContent('ru-word', randomRu.wordTranslate);
    }
}

export default function renderSprintGame(parentElement: HTMLElement, data: Word[]): void {
    const gameContainer = createElement({
        type: 'div',
        parentElement,
        classes: ['game-container'],
    });
    state.sprintGame.isGame = true;
    renderClockBlock(gameContainer);
    renderPointsBlock(gameContainer);
    renderTickBlock(gameContainer);
    renderAnswerBlock(gameContainer);
    renderButtonsBlock(gameContainer);
    setAnswerBlock(data);
    resetSprintPoints();
}
