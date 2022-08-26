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
        wordsLearnt: 0,
        isGame: false,
    } as SprintState,
    textBook: {
        currentLevel: 0,
        currentPage: 1,
        authenticated: false,
        currentWordId: '5e9f5ee35eb9e72bc21af4a5',
    },
    controls: {
        isSound: true,
        isFullscreen: false,
    } as ControlsState,
} as StateInterface;

export default state;
