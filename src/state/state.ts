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

    audioCallGame: {
        currentLevel: '',
        currentWord: {},
        givenWords: [],
        needLearnWords: [],
        currentLearned: [],
        currentMistakes: [],
        wordsLearnt: 0,
    },
} as StateInterface;

export default state;
