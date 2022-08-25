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
        isSound: true,
    } as SprintState,
    controls: {
        isSound: true,
        isFullscreen: false,
    } as ControlsState,
} as StateInterface;

export default state;
