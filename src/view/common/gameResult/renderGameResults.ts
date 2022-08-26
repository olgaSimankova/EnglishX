import { RESULT_TAB_LABELS } from '../../../constants/constants';
import { Word } from '../../../constants/types';
import createElement from '../../../utils/createElement';
import './gameResult.scss';

function renderResultTabs(parentElement: HTMLElement): void {
    const tabsContainer = createElement({
        type: 'div',
        parentElement,
        classes: ['tabs-container'],
    });
    RESULT_TAB_LABELS.forEach((tag) => {
        createElement({
            type: 'button',
            parentElement: tabsContainer,
            classes: ['tab', `${tag.split(' ')[0]}-tab`.toLocaleLowerCase()],
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

function renderSliderLeftSide(parentElement: HTMLElement, goodAnswers: Word[], badAnswers: Word[]): void {
    const leftSide = createElement({
        type: 'div',
        parentElement,
        classes: ['left-side-container', 'side'],
    });
    createElement({
        type: 'h2',
        parentElement: leftSide,
        classes: ['title-result', 'text-center'],
        text: 'Nice one, you are awesome!',
    });
    const goodLength = goodAnswers.length;
    const badLength = badAnswers.length;
    const totalLength = goodLength + badLength;
    let percents = Math.floor((goodLength / totalLength) * 100);
    if (Object.is(percents, NaN)) {
        percents = 0;
    }
    createElement({
        type: 'p',
        parentElement: leftSide,
        classes: ['result-description', 'text-center'],
        text: `${totalLength} words trained, ${badLength} words need to learn`,
    });
    renderPercents(leftSide, percents);
}

function renderListHeader(parentElement: HTMLElement, label: string, num: number): void {
    const listHeaderContainer = createElement({
        type: 'div',
        parentElement,
        classes: ['list-header-container'],
    });
    createElement({
        type: 'p',
        parentElement: listHeaderContainer,
        classes: ['list-header'],
        text: label,
    });
    const wrapper = createElement({
        type: 'div',
        parentElement: listHeaderContainer,
        classes: [`counter-wrapper`, `${label.toLocaleLowerCase()}-container`],
    });
    createElement({
        type: 'p',
        parentElement: wrapper,
        classes: ['list-header', label.toLocaleLowerCase()],
        text: num.toString(),
    });
}

function renderWords(parentElement: HTMLElement, list: Word[]): void {
    const listContainer = createElement({
        type: 'ul',
        parentElement,
        classes: ['list-ul'],
    });
    list.forEach((el) => {
        const li = createElement({
            type: 'li',
            parentElement: listContainer,
            classes: ['list-element'],
        });
        createElement({
            type: 'div',
            parentElement: li,
            classes: ['sound-image'],
            attributes: [['data', el.audio]],
        });
        createElement({
            type: 'p',
            parentElement: li,
            classes: ['eng-word-list', 'word'],
            text: el.word,
        });
        createElement({
            type: 'p',
            parentElement: li,
            classes: ['word'],
            text: '-',
        });
        createElement({
            type: 'p',
            parentElement: li,
            classes: ['ru-word-list', 'word'],
            text: el.wordTranslate,
        });
    });
}

function renderListOfWords(parentElement: HTMLElement, listWithWords: Word[], label: string): void {
    const listContainer = createElement({
        type: 'div',
        parentElement,
        classes: [label.toLocaleLowerCase(), 'list-container'],
    });
    if (listWithWords.length) {
        renderListHeader(listContainer, label, listWithWords.length);
        renderWords(listContainer, listWithWords);
    }
}

function renderSLiderRightSide(parentElement: HTMLElement, goodAnswers: Word[], badAnswers: Word[]): void {
    const rightSide = createElement({
        type: 'div',
        parentElement,
        classes: ['right-side-container', 'side'],
    });
    const mistakesContainer = createElement({
        type: 'div',
        parentElement: rightSide,
        classes: ['mistakes-container'],
    });
    const knowContainer = createElement({
        type: 'div',
        parentElement: rightSide,
        classes: ['know-container'],
    });
    renderListOfWords(mistakesContainer, badAnswers, 'Mistakes');
    renderListOfWords(knowContainer, goodAnswers, 'Know');
}

export default function renderResultPage(parentClass: string, goodAnswers: Word[], badAnswers: Word[]): void {
    const sprintContainer = document.querySelector(`.${parentClass}`) as HTMLElement;
    const resultContainer = createElement({
        type: 'div',
        parentElement: sprintContainer,
        classes: ['results-container'],
    });
    renderResultTabs(resultContainer);
    const sliderContainer = createElement({
        type: 'div',
        parentElement: resultContainer,
        classes: ['slider'],
    });
    renderSliderLeftSide(sliderContainer, goodAnswers, badAnswers);
    renderSLiderRightSide(sliderContainer, goodAnswers, badAnswers);
    renderResultBottomButtons(resultContainer);
}
