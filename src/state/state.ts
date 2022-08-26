import { ControlsState, SprintState, StateInterface } from '../constants/types';

export const state = {
    sprintGame: {
        currentLevel: '',
        currentBet: 10,
        currentPoints: 0,
        currentTick: 0,
        currentMultiply: 1,
        currentLearned: [],
        currentMistakes: [],
        usedNumbers: [],
        currentPage: 0,
        wordsLearnt: 0,
        currentMaxLength: 0,
        isFreeze: false,
        isGame: false,
        isSound: true,
    } as SprintState,

    audioCallGame: {
        currentLevel: '',
        currentWord: {},
        givenWords: [],
        needLearnWords: [],
        currentLearned: [],
        currentMistakes: [],
        wordsLearnt: 0,
    },

    controls: {
        isSound: true,
        isFullscreen: false,
    } as ControlsState,
} as StateInterface;

export default state;
