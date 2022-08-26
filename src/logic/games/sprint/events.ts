import getWords from '../../../api/words';
import { KEY_ARROWS, MAX_PAGES, GAME_BUTTONS } from '../../../constants/constants';
import { AudioCall, GameTags, Levels, SprintState, Word } from '../../../constants/types';
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
    processResultGameButtons,
    reloadNewWord,
    setAnswerBlock,
    setPoints,
    sprintGameControls,
} from './controls';
import renderAudioCallGame from '../../../view/pages/games/audio-call/renderAudioCallGame';

export default function listenLevelButtons(tag: GameTags): void {
    const levelsContainer = document.querySelector('.level-container');
    levelsContainer?.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const data = target.getAttribute('data');
        if (data) {
            (state[tag as keyof typeof state] as SprintState | AudioCall).currentLevel = data;
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
            if (gameContainer && tag) {
                const MIN_PAGE = reload ? Math.floor(MAX_PAGES / 2) : 0;
                const level =
                    Levels[
                        (state[tag as keyof typeof state] as SprintState | AudioCall)
                            .currentLevel as keyof typeof Levels
                    ];
                const page = getRandomNumber(MIN_PAGE, MAX_PAGES);
                state.sprintGame.currentPage = page;
                renderLoading(gameContainer);
                const data = await getWords(level, page);
                deleteHTMLElement('loading-container');
                switch (tag) {
                    case GameTags.sprintGame:
                        renderSprintGame(gameContainer, data);
                        sprintGameControls(data, reload);
                        break;

                    case 'audioCall':
                        renderAudioCallGame(gameContainer, data);
                        // sprintGameControls(data);
                        break;
                    default:
                        break;
                }
            }
        }
    });
}

export function listenChoiceButtons(data: Word[], reload = false): void {
    let { length } = data;
    let newData = data;
    const buttonsContainer = document.querySelector('.buttons-container');
    buttonsContainer?.addEventListener('click', async (e) => {
        if (!state.sprintGame.isFreeze) {
            newData = await choiceAction(e, newData, length, reload);
            length = state.sprintGame.currentMaxLength;
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

export function listenKeyboard(data: Word[], reload = false): void {
    let newData = data;
    let { length } = data;
    document.addEventListener('keyup', async (e) => {
        const keyName = e.key;
        const choice = keyName === KEY_ARROWS.left ? GAME_BUTTONS.YES : GAME_BUTTONS.NO;
        if (Object.values(KEY_ARROWS).includes(keyName) && !state.sprintGame.isFreeze) {
            if (state.sprintGame.wordsLearnt < length) {
                const action = checkAnswerSprintGame(choice);
                setPoints(action);
                setAnswerBlock(newData);
                state.sprintGame.wordsLearnt += 1;
            } else if (reload && state.sprintGame.currentPage) {
                newData = await reloadNewWord(choice);
                length += newData.length;
            } else {
                state.sprintGame.isGame = false;
            }
        }
    });
}
