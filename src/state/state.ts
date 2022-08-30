import { AudioCallStatus, ControlsState, SprintState, StateInterface, Textbook, User } from '../constants/types';

export const state: StateInterface = {
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
        bestStreak: 0,
        currentStreak: 0,
    } as SprintState,

    audioCallGame: {
        currentLevel: '',
        currentWord: {},
        givenWords: [],
        needLearnWords: [],
        currentLearned: [],
        currentMistakes: [],
        wordsLearnt: 0,
        status: AudioCallStatus.waitingAnswer,
        bestStreak: 0,
        currentStreak: 0,
    },

    textBook: {
        currentLevel: 0,
        currentPage: 1,
        wordsOnPage: [],
        currentWordId: '5e9f5ee35eb9e72bc21af4a5',
    } as Textbook,
    controls: {
        isSound: true,
        isFullscreen: false,
    } as ControlsState,
    user: {
        email: '',
        password: '',
        name: '',
        isAuthenticated: false,
        userId: '',
        token: '',
    } as User,
} as StateInterface;

export default state;
