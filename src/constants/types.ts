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

export enum Difficulty {
    '0-600' = 'Easy',
    '601-1200' = 'Easy',
    '1201-1800' = 'Medium',
    '1801-2400' = 'Medium',
    '2401-3000' = 'Hard',
    '3001-3600' = 'Hard',
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

export interface Textbook {
    levelChosen: number;
    authenticated: boolean;
}

export interface StateInterface {
    sprintGame: SprintState;
    textBook: Textbook;
}

export interface User {
    email: string;
    password: string;
    name?: string;
}
