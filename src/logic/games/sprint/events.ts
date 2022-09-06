import { getUserAggregatedWordsFromPage, getWords } from '../../../api/words';
import { KEY_ARROWS, MAX_PAGES, GAME_BUTTONS } from '../../../constants/constants';
import { AudioCall, GameTags, Levels, SprintState, Word, WordStatus } from '../../../constants/types';
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
import { renderAudioCallGame } from '../../../view/pages/games/audio-call/renderAudioCallGame';
import { getFromLocalStorage } from '../../../utils/localStorage';
import { handlePaginationResult } from '../../textbook/vocabulary';

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

function runGame(tag: GameTags, data: Word[], gameContainer: HTMLElement, reload: boolean): void {
    switch (tag) {
        case GameTags.sprintGame:
            renderSprintGame(gameContainer, data);
            sprintGameControls(data, reload);
            break;

        case GameTags.audioCallGame:
            renderAudioCallGame(gameContainer, data);
            break;
        default:
            break;
    }
}

async function startGameFromMenu(reload: boolean, tag: GameTags, gameContainer: HTMLElement): Promise<void> {
    const MIN_PAGE = reload ? Math.floor(MAX_PAGES / 2) : 0;
    const level =
        Levels[(state[tag as keyof typeof state] as SprintState | AudioCall).currentLevel as keyof typeof Levels];
    const page = getRandomNumber(MIN_PAGE, MAX_PAGES);
    state.sprintGame.currentPage = page;
    renderLoading(gameContainer);
    const data = await getWords(level, page);
    deleteHTMLElement('loading-container');
    runGame(tag, data, gameContainer, reload);
}

async function startGameFromTextBook(gameContainer: HTMLElement, tag: GameTags, reload: boolean): Promise<void> {
    const level = +getFromLocalStorage('currentWordsLevel');
    const page = +getFromLocalStorage('currentTextBookPage');
    const filter = encodeURIComponent(JSON.stringify({ 'userWord.difficulty': WordStatus.weak }));
    state.sprintGame.currentPage = +page;
    renderLoading(gameContainer);
    const data = await getUserAggregatedWordsFromPage(page - 1, level, filter);
    deleteHTMLElement('loading-container');
    if (data) {
        const words = handlePaginationResult(data);
        runGame(tag, words, gameContainer, reload);
    }
}

export function listerStartButton(tag: GameTags, reload = false): void {
    const startButton = document.querySelector('.start-button') as HTMLElement;
    startButton?.addEventListener('click', async () => {
        if (startButton.classList.contains('active')) {
            deleteHTMLElement('start-screen');
            const gameContainer = document.querySelector('.game-container') as HTMLElement;
            const isTextBook = getFromLocalStorage('isFromTextBook') === 'true';
            if (gameContainer && tag && !isTextBook) {
                startGameFromMenu(reload, tag, gameContainer);
            } else if (gameContainer && tag && isTextBook) {
                startGameFromTextBook(gameContainer, tag, reload);
            }
        }
    });
}

export function listenChoiceButtons(data: Word[], reload = false): void {
    let newData = data;
    let { length } = newData;
    state.sprintGame.currentMaxLength += length;
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
        const action = checkAnswerSprintGame(choice);
        setPoints(action);
        if (Object.values(KEY_ARROWS).includes(keyName) && !state.sprintGame.isFreeze) {
            if (state.sprintGame.wordsLearnt < length - 1) {
                setAnswerBlock(newData);
                state.sprintGame.wordsLearnt += 1;
            } else if (reload && state.sprintGame.currentPage) {
                newData = await reloadNewWord();
                length += newData.length;
            } else {
                state.sprintGame.isGame = false;
            }
        }
    });
}
