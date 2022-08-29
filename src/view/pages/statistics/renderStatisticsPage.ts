import {
    ALL_THE_TIME_DESCRIPTION,
    ALL_THE_TIME_LABEL,
    LEARNT_WORDS_LABEL,
    PROGRESS_LABEL,
    STATISTIC_ICON,
    TODAYS_STATISTIC_LABEL,
} from '../../../constants/constants';
import statisticsControls from '../../../logic/statistics/statsControls';
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
function renderGameBlock(parentElement: HTMLElement, gameName: string, stats: string[]): void {
    const container = createElement({
        type: 'div',
        parentElement,
        classes: ['game-container'],
    });
    createElement({
        type: 'p',
        parentElement: container,
        classes: ['game-title'],
        text: gameName,
    });
    Object.entries(STATISTIC_ICON).forEach((values, i) => {
        const div = createElement({
            type: 'div',
            parentElement: container,
            classes: ['game-stats'],
        });
        createElement({
            type: 'div',
            parentElement: div,
            classes: [`game-icon-${i + 1}`, 'game-icon'],
        });
        createElement({
            type: 'p',
            parentElement: div,
            classes: ['game-option-description'],
            text: `${values[1]} ${stats[i]}`,
        });
    });
}

function renderGameStatistic(parentElement: HTMLElement): void {
    const container = createElement({
        type: 'div',
        parentElement,
        classes: ['games-container'],
    });
    renderGameBlock(container, 'Sprint', ['0', '0%', '0']);
    renderGameBlock(container, 'AudioCall', ['0', '0%', '0']);
}

function renderToggleButton(parentElement: HTMLElement): void {
    const label = createElement({
        type: 'div',
        parentElement,
        classes: ['container'],
    });
    createElement({
        type: 'label',
        parentElement: label,
        classes: ['text'],
        attributes: [['for', 'toggle-button']],
        text: LEARNT_WORDS_LABEL,
    });
    createElement({
        type: 'input',
        parentElement: label,
        classes: ['toggle-button'],
        attributes: [
            ['type', 'checkbox'],
            ['name', 'toggle'],
            ['id', 'toggle-button'],
        ],
    });
    createElement({
        type: 'label',
        parentElement: label,
        classes: ['text'],
        attributes: [['for', 'toggle-button']],
        text: PROGRESS_LABEL,
    });
}

function renderToggleBlock(parentElement: HTMLElement): void {
    const container = createElement({
        type: 'div',
        parentElement,
        classes: ['toggle-container'],
    });
    renderToggleButton(container);
}

function renderGraph(parentElement: HTMLElement): void {
    const container = createElement({
        type: 'div',
        parentElement,
        classes: ['graph-container'],
    });
    createElement({
        type: 'canvas',
        parentElement: container,
        classes: ['chart'],
        attributes: [['id', 'chart']],
    });
}

function renderAllTimeStats(parentElement: HTMLElement): void {
    const container = createElement({
        type: 'div',
        parentElement,
        classes: ['alltime-container'],
    });
    createElement({
        type: 'h2',
        parentElement: container,
        classes: ['alltime-label'],
        text: ALL_THE_TIME_LABEL,
    });
    createElement({
        type: 'h3',
        parentElement: container,
        classes: ['alltime-description'],
        text: ALL_THE_TIME_DESCRIPTION,
    });
    renderToggleBlock(container);
    renderGraph(container);
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
    renderAllTimeStats(container);
    createFooter(container);
    statisticsControls();
}
