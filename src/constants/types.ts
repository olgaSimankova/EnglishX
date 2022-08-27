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
    currentPage: number;
    usedNumbers: number[];
    currentMaxLength: number;
    isFreeze: boolean;
    wordsLearnt: number;
    isGame: boolean;
}

export interface Textbook {
    currentLevel: number;
    currentPage: number;
    currentWordId: string;
    wordsOnPage: Word[];
}

export interface ControlsState {
    isSound: boolean;
    isFullscreen: boolean;
}

export interface User {
    email: string;
    password: string;
    isAuthenticated?: boolean; // I've checked it - this field must stay optional due to createUser API request
    name?: string;
}

export interface StateInterface {
    sprintGame: SprintState;
    textBook: Textbook;
    controls: ControlsState;
    user: User;
}

export enum Choice {
    right = 'right',
    wrong = 'wrong',
}

export enum GameTags {
    sprintGame = 'sprintGame',
    audioCallGame = 'audioCall',
}

export interface FullScreenDocumentElement extends HTMLElement {
    msRequestFullscreen?: () => void;
    mozRequestFullScreen?: () => void;
    webkitRequestFullscreen?: () => void;
}

export interface FullScreenDocument extends Document {
    documentElement: FullScreenDocumentElement;
    mozFullScreenElement?: Element;
    msFullscreenElement?: Element;
    webkitFullscreenElement?: Element;
    msExitFullscreen?: () => void;
    mozCancelFullScreen?: () => void;
    webkitExitFullscreen?: () => void;
}

export interface Auth {
    message: string;
    token: string;
    refreshToken: string;
    userId: string;
    name: string;
}
