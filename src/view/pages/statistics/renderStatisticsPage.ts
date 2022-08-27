import { TODAYS_STATISTIC_LABEL } from '../../../constants/constants';
import createElement from '../../../utils/createElement';
import createFooter from '../../common/createFooter';
import createHeader from '../../common/createHeader';
import '../main/scss/style.scss';

function renderStatisticBlock(parentElement: HTMLElement, numberLabel: string, description: string): void {
    const container = createElement({
        type: 'div',
        parentElement,
        classes: ['stat-div'],
    });
    createElement({
        type: 'p',
        parentElement: container,
        classes: ['big-stat-number'],
        text: numberLabel,
    });
    createElement({
        type: 'p',
        parentElement: container,
        classes: ['stat-description'],
        text: description.toLocaleUpperCase(),
    });
}

function renderTodaysStatistics(parentElement: HTMLElement): void {
    const container = createElement({
        type: 'div',
        parentElement,
        classes: ['todays-statistics-container'],
    });
    createElement({
        type: 'h3',
        parentElement: container,
        classes: ['todays-header'],
        text: TODAYS_STATISTIC_LABEL,
    });
    const statsContainer = createElement({
        type: 'div',
        parentElement: container,
        classes: ['statistic-container'],
    });
    renderStatisticBlock(statsContainer, '0', 'words learnt'); // implement later
    renderStatisticBlock(statsContainer, '0%', 'right answers'); // implement later
}
function renderGameBlock(
    parentElement: HTMLElement,
    gameName: string,
    wordsLearnt: string,
    rightAnswer: string,
    streak: string
): void {
    const container = createElement({
        type: 'div',
        parentElement: document.body,
        classes: ['game-container'],
    });
    createElement({
        type: 'p',
        parentElement: container,
        classes: ['game-title'],
        text: gameName,
    });
}

function renderGameStatistic(parentElement: HTMLElement): void {
    const container = createElement({
        type: 'div',
        parentElement: document.body,
        classes: ['games-container'],
    });
}

export default function renderStatisticsPage(): void {
    const container = createElement({
        type: 'div',
        parentElement: document.body,
        classes: ['statistics-container'],
    });
    createHeader(container);
    renderTodaysStatistics(container);
    renderGameStatistic(container);
    createFooter(container);
}
