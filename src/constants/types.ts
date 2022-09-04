import { Chart } from 'chart.js';

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

export type WordType = Word;

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
    bestStreak: number;
    currentStreak: number;
    currentWordId: string;
}

export enum AudioCallStatus {
    waitingAnswer = `DON'T KNOW`,
    answerReceived = 'NEXT',
}

export interface AudioCall {
    currentLevel: string;
    learningWord?: Word;
    givenWords: Word[];
    needLearnWords: Word[];
    currentLearned: Word[];
    currentMistakes: Word[];
    wordsLearnt: number;
    status: AudioCallStatus;
    bestStreak: number;
    currentStreak: number;
    currentWordId: string;
}

export interface Textbook {
    view: string;
    currentLevel: number;
    currentPage: number;
    currentWordNo: string;
    wordsOnPage: Word[];
}

export interface ControlsState {
    isSound: boolean;
    isFullscreen: boolean;
    chartID?: Chart<'bar', string[], string>;
}

export interface aggregatedWords {
    weak?: Word[];
    learned?: Word[];
    hard?: Word[];
    deleted?: Word[];
}

export interface User {
    email: string;
    password: string;
    isAuthenticated?: boolean;
    name?: string;
    userId?: string;
    token?: string;
    refreshToken?: string;
    aggregatedWords?: aggregatedWords;
}

export interface StateInterface {
    sprintGame: SprintState;
    audioCallGame: AudioCall;
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
    audioCallGame = 'audioCallGame',
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

export interface UserResponse {
    message: string;
    name: string;
    refreshToken: string;
    token: string;
    userId: string;
}
export interface GamePercentage {
    right: number;
    wrong: number;
    streak: number;
    newWords: number;
}
export interface GameObject {
    sprintGame?: GamePercentage;
    audioCallGame?: GamePercentage;
}

export interface StatsProp {
    newWords: number;
    allWords: number;
    games: GameObject;
}

export interface Stats {
    [key: string]: StatsProp;
}

export interface GameStreak {
    sprintGame?: number;
    audioCallGame?: number;
}

export interface OptionalUser {
    stats: Stats;
    wordList: string;
}

export interface UserStatsResponse {
    learnedWords: number;
    optional: OptionalUser;
    id?: string;
}

export enum WordStatus {
    weak = 'weak',
    hard = 'hard',
    deleted = 'deleted',
    learned = 'learned',
}

export interface GameStat {
    right: number;
    wrong: number;
    streak: number;
}

export interface GamesStat {
    sprintGame: GameStat;
    audioCallGame: GameStat;
}

export interface OptionalWord {
    addTime?: string;
    try?: number;
    games?: GamesStat;
    isDeleted?: boolean;
    wordId?: string;
}

export interface WordStats {
    difficulty: WordStatus;
    optional?: OptionalWord;
    id?: string;
    wordId?: string;
}

export interface DateWithWords {
    [key: string]: string;
}

export interface GamesResults {
    sprintGame: string;
    audioCallGame: string;
}

interface aggregatedCount {
    count: number;
}

export interface AggregatedResponse {
    paginatedResults: Word[];
    totalCount: aggregatedCount[];
}
