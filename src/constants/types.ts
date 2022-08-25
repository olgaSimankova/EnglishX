export interface CreateElementInterface {
    type: string;
    parentElement: HTMLElement;
    classes?: string[];
    text?: string;
    attributes?: [string, string][];
}

export enum Levels {
    'A1',
    'A2',
    'B1',
    'B2',
    'C1',
    'C2',
}

export interface Word {
    id: string;
    group: number;
    page: number;
    word: string;
    image: string;
    audio: string;
    audioMeaning: string;
    audioExample: string;
    textMeaning: string;
    textExample: string;
    transcription: string;
    wordTranslate: string;
    textMeaningTranslate: string;
    textExampleTranslate: string;
}

export interface SprintState {
    currentLevel: string;
    currentEngWord?: Word;
    currentRuWord?: Word;
    currentBet: number;
    currentPoints: number;
    currentTick: number;
    currentMultiply: number;
    currentLearned: Word[];
    currentMistakes: Word[];
    usedNumbers: number[];
    wordsLearnt: number;
    isGame: boolean;
}

export interface ControlsState {
    isSound: boolean;
    isFullscreen: boolean;
}

export interface StateInterface {
    sprintGame: SprintState;
    controls: ControlsState;
}

export interface User {
    email: string;
    password: string;
    name?: string;
}

export enum Choice {
    right = 'right',
    wrong = 'wrong',
}

export enum GameTags {
    sprintGame = 'sprintGame',
    audioCallGame = 'audioCall',
}
