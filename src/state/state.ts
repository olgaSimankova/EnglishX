import { StateInterface } from '../constants/types';

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
    },
    textBook: {
        levelChosen: 0,
        authenticated: false,
    },
} as StateInterface;

export default state;
