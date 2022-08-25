import getWords from '../../../api/words';
import { KEY_ARROWS, MAX_PAGES, GAME_BUTTONS } from '../../../constants/constants';
import { GameTags, Levels, SprintState, Word } from '../../../constants/types';
import { state } from '../../../state/state';
import { deleteHTMLElement } from '../../../utils/createElement';
import playAudio, { getFullPath } from '../../../utils/playAudio';
import getRandomNumber from '../../../utils/randomize';
import removeClassElement from '../../../utils/removeClassElement';
import renderLoading from '../../../view/common/loading/renderLoading';
import renderSprintGame from '../../../view/pages/games/sprint/renderSprintGame';
import {
    checkAnswerSprintGame,
    choiceAction,
    getNewData,
    processResultGameButtons,
    setAnswerBlock,
    setPoints,
    sprintGameControls,
} from './controls';

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

export function listerStartButton(tag: GameTags, reload = false): void {
    const startButton = document.querySelector('.start-button') as HTMLElement;
    startButton?.addEventListener('click', async () => {
        if (startButton.classList.contains('active')) {
            deleteHTMLElement('start-screen');
            const gameContainer = document.querySelector('.game-container') as HTMLElement;
            console.log(state);
            if (gameContainer && tag) {
                const level =
                    Levels[(state[tag as keyof typeof state] as SprintState).currentLevel as keyof typeof Levels];
                const page = getRandomNumber(0, MAX_PAGES);
                renderLoading(gameContainer);
                const data = await getWords(level, page);
                deleteHTMLElement('loading-container');
                switch (tag) {
                    case GameTags.sprintGame:
                        state.sprintGame.usedPages.push(page);
                        renderSprintGame(gameContainer, data);
                        sprintGameControls(data);
                        break;
                    default:
                        break;
                }
            }
        }
    });
}

export function listenChoiceButtons(data: Word[], reload = false): void {
    const buttonsContainer = document.querySelector('.buttons-container');
    buttonsContainer?.addEventListener('click', (e) => {
        choiceAction(e, data, reload);
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

export function listenSoundResultList(): void {
    const list = document.querySelector('.right-side-container');
    list?.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const data = target.getAttribute('data');
        if (data) {
            const path = getFullPath(data);
            playAudio(path);
        }
    });
}

export function listenResultBottomButtons(): void {
    const container = document.querySelector('.bottom-buttons-container');
    container?.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const data = target.getAttribute('data');
        if (data) {
            processResultGameButtons(data);
        }
    });
}

export function listenKeyboard(data: Word[]): void {
    document.addEventListener('keyup', async (e) => {
        const keyName = e.key;
        const choice = keyName === KEY_ARROWS.left ? GAME_BUTTONS.YES : GAME_BUTTONS.NO;
        if (Object.values(KEY_ARROWS).includes(keyName)) {
            if (state.sprintGame.wordsLearnt < data.length) {
                const action = checkAnswerSprintGame(choice);
                setPoints(action);
                setAnswerBlock(data);
                state.sprintGame.wordsLearnt += 1;
            } else {
                state.sprintGame.isGame = false;
            }
        }
    });
}
