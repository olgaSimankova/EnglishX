import getWords from '../../../api/words';
import { MAX_PAGES } from '../../../constants/constants';
import { Levels, Word } from '../../../constants/types';
import { state } from '../../../state/state';
import { deleteHTMLElement } from '../../../utils/createElement';
import getRandomNumber from '../../../utils/randomize';
import removeClassElement from '../../../utils/removeClassElement';
import renderSprintGame, { setAnswerBlock } from '../../../view/pages/games/sprint/renderSprintGame';
import { checkAnswerSprintGame, setPoints, sprintGameControls } from './controls';

export default function listenLevelButtons(): void {
    const levelsContainer = document.querySelector('.level-container');
    levelsContainer?.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const data = target.getAttribute('data');
        if (data) {
            state.sprintGame.currentLevel = data;
            removeClassElement('level-button', 'active-level-button');
            target.classList.add('active-level-button');
            const startButton = document.querySelector('.start-button');
            startButton?.classList.add('active');
        }
    });
}

export function listerStartButton(): void {
    const startButton = document.querySelector('.start-button') as HTMLElement;
    startButton?.addEventListener('click', async () => {
        if (startButton.classList.contains('active')) {
            deleteHTMLElement('start-screen');
            const sprintContainer = document.querySelector('.sprint-container') as HTMLElement;
            if (sprintContainer) {
                const level = Levels[state.sprintGame.currentLevel as keyof typeof Levels];
                const page = getRandomNumber(0, MAX_PAGES);
                const data = await getWords(level, page);
                renderSprintGame(sprintContainer, data);
                sprintGameControls(data);
            }
        }
    });
}

export function listenChoiceButtons(data: Word[]): void {
    const buttonsContainer = document.querySelector('.buttons-container');
    buttonsContainer?.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const value = target.getAttribute('data');
        if (value && state.sprintGame.wordsLearnt < data.length) {
            const action = checkAnswerSprintGame(value);
            setPoints(action);
            setAnswerBlock(data);
            state.sprintGame.wordsLearnt += 1;
        } else {
            state.sprintGame.isGame = false;
        }
    });
}

export function listenResultTabs(): void {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach((tab) => {
        tab.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            if (!target.classList.contains('active')) {
                removeClassElement('tab', 'active');
                target.classList.add('active');
                const slider = document.querySelector('.slider');
                slider?.classList.toggle('move-left');
            }
        });
    });
}
