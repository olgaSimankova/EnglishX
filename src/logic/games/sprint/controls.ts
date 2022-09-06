import { getWords, getWordStatistics, setUserWordStats } from '../../../api/words';
import { GAME_BUTTONS, RANDOM_MIDDLE, START_POINTS } from '../../../constants/constants';
import { Choice, GamesStat, GameTags, Levels, Word, WordStats, WordStatus } from '../../../constants/types';
import state from '../../../state/state';
import { deleteHTMLElement } from '../../../utils/createElement';
import { getHTMLElementContent, setHTMLElementContent } from '../../../utils/handleHTMLTextContent';
import { playChoiceSound } from '../../../utils/playAudio';
import getRandomNumber from '../../../utils/randomize';
import renderResultPage from '../../../view/common/gameResult/renderGameResults';
import listenLevelButtons, {
    filterOnlyWeakWords,
    listenChoiceButtons,
    listenKeyboard,
    listerStartButton,
} from './events';
import gameResultControls from '../../../view/common/gameResult/gameResultControls';
import { initDefaultGamesStats, processGamesStatObject } from '../../../utils/handleGameStatObjects';
import applyLocalStorage, { getFromLocalStorage } from '../../../utils/localStorage';
import getWordIdByName from '../../textbook/utils/getWordAttributes';

export function setAnswerBlock(data: Word[]): void {
    const { length } = data;
    if (state.sprintGame.usedNumbers.length !== length) {
        let randomNumber = getRandomNumber(0, length);
        while (state.sprintGame.usedNumbers.includes(randomNumber)) {
            randomNumber = getRandomNumber(0, length);
        }
        state.sprintGame.usedNumbers.push(randomNumber);
        const randomEng = data[randomNumber];
        const id = randomEng.id ? randomEng.id : getWordIdByName([randomEng], randomEng.word);
        state.sprintGame.currentWordId = id;
        state.sprintGame.currentEngWord = randomEng;
        const randomRu = Math.random() < RANDOM_MIDDLE ? randomEng : data[getRandomNumber(0, length)];
        state.sprintGame.currentRuWord = randomRu;
        setHTMLElementContent('eng-word', randomEng.word);
        setHTMLElementContent('ru-word', randomRu.wordTranslate);
    }
}

export default function startPageControls(tag: GameTags, reload = false): void {
    listenLevelButtons(tag);
    listerStartButton(tag, reload);
    applyLocalStorage();
}

export function finishGame(id?: NodeJS.Timer): void {
    state.sprintGame.bestStreak =
        state.sprintGame.bestStreak > state.sprintGame.currentStreak
            ? state.sprintGame.bestStreak
            : state.sprintGame.currentStreak;
    if (id) {
        clearInterval(id);
    }
    deleteHTMLElement('sprint-container');
    renderResultPage(
        'game-container',
        state.sprintGame.currentLearned,
        state.sprintGame.currentMistakes,
        GameTags.sprintGame
    );
    gameResultControls();
}

function startTimer(): void {
    let timeLeft = Number(getHTMLElementContent('clock-counter'));

    const id = setInterval(() => {
        if (timeLeft && state.sprintGame.isGame && getHTMLElementContent('eng-word') !== 'eng-word') {
            timeLeft -= 1;
            setHTMLElementContent('clock-counter', timeLeft.toString());
        } else {
            finishGame(id);
        }
    }, 1000);
}

export function checkAnswerSprintGame(option: boolean): boolean {
    const word1 = state.sprintGame.currentEngWord?.wordTranslate;
    const word2 = state.sprintGame.currentRuWord?.wordTranslate;
    return (word1 === word2) === option;
}

function increaseScore(): void {
    const { currentTick } = state.sprintGame;
    state.sprintGame.currentPoints += state.sprintGame.currentBet;
    if (currentTick === 3) {
        state.sprintGame.currentTick = 1;
        state.sprintGame.currentMultiply += 1;
        state.sprintGame.currentBet = state.sprintGame.currentMultiply * Number(START_POINTS);
    } else {
        state.sprintGame.currentTick += 1;
    }
}

function updateViewPoints() {
    const { currentTick, currentMultiply, currentPoints } = state.sprintGame;
    setHTMLElementContent('answers-queue', currentTick.toString());
    setHTMLElementContent('coefficient', currentMultiply.toString());
    setHTMLElementContent('result', currentPoints.toString());
    setHTMLElementContent('plus', `+${currentMultiply * Number(START_POINTS)}`);
}

function unpdateWordsResult(action: boolean) {
    const { currentEngWord, currentLearned, currentMistakes, isGame } = state.sprintGame;
    if (currentEngWord && action && isGame) {
        currentLearned.push(currentEngWord);
    } else if (currentEngWord && !action && isGame) {
        currentMistakes.push(currentEngWord);
    }
}

export function resetSprintPoints(): void {
    state.sprintGame.currentBet = Number(START_POINTS);
    state.sprintGame.currentPoints = 0;
    state.sprintGame.currentTick = 0;
    state.sprintGame.currentMultiply = 1;
    state.sprintGame.currentLearned = [];
    state.sprintGame.currentMistakes = [];
    state.sprintGame.usedNumbers = [];
    state.sprintGame.wordsLearnt = 0;
}

function countDifficulty(obj: GamesStat, isRight: boolean, status: WordStatus): WordStatus {
    if (!isRight) {
        return WordStatus.hard;
    }
    const streak = (obj.audioCallGame.streak || 0) + (obj.sprintGame.streak || 0);
    if (
        (WordStatus.weak === status && streak > 2) ||
        (WordStatus.hard === status && streak > 4) ||
        WordStatus.learned === status
    ) {
        return WordStatus.learned;
    }
    return status;
}

export async function saveAnswerToDB(isRight: boolean, tag: GameTags): Promise<void> {
    const wordID = state[tag].currentWordId;
    const oldStats = await getWordStatistics(wordID);
    const initGame = initDefaultGamesStats();
    if (!oldStats?.optional) {
        const opt: WordStats = {
            difficulty: isRight ? WordStatus.weak : WordStatus.hard,
            optional: {
                games: processGamesStatObject(initGame, isRight, tag),
            },
        };
        setUserWordStats(wordID, opt);
    } else if (oldStats.optional.games) {
        const gamesIncreased = processGamesStatObject(oldStats.optional.games, isRight, tag);
        const difficulty = countDifficulty(gamesIncreased, isRight, oldStats.difficulty);
        const opt: WordStats = {
            difficulty,
            optional: {
                games: gamesIncreased,
            },
        };
        setUserWordStats(wordID, opt, true);
    }
}

export function setPoints(action: boolean): void {
    if (action) {
        increaseScore();
        playChoiceSound(Choice.right);
        state.sprintGame.currentStreak += 1;
        saveAnswerToDB(true, GameTags.sprintGame);
    } else {
        state.sprintGame.currentTick = 1;
        state.sprintGame.currentMultiply = 1;
        playChoiceSound(Choice.wrong);
        state.sprintGame.bestStreak =
            state.sprintGame.bestStreak > state.sprintGame.currentStreak
                ? state.sprintGame.bestStreak
                : state.sprintGame.currentStreak;
        saveAnswerToDB(false, GameTags.sprintGame);
    }
    updateViewPoints();
    unpdateWordsResult(action);
}

export async function reloadNewWord(): Promise<Word[]> {
    state.sprintGame.isFreeze = true;
    state.sprintGame.usedNumbers = [];
    state.sprintGame.currentPage -= 1;
    const level = Levels[state.sprintGame.currentLevel as keyof typeof Levels];
    let newData = await getWords(level, state.sprintGame.currentPage);
    const needFilter = getFromLocalStorage('isFromTextBook') === 'true';
    if (needFilter) {
        newData = filterOnlyWeakWords(newData);
    }
    if (state.sprintGame.currentPage >= 0 && newData.length) {
        setAnswerBlock(newData);
    } else {
        finishGame();
    }
    state.sprintGame.isFreeze = false;

    return newData;
}

export function sprintGameControls(data: Word[], reload = false): void {
    startTimer();
    listenChoiceButtons(data, reload);
    listenKeyboard(data, reload);
}

export function processResultGameButtons(data: string): void {
    switch (data.toLocaleLowerCase()) {
        case 'go':
            window.location.href = './textbook.html';
            break;
        case 'play':
            window.location.href = './sprint.html';
            break;
        default:
            break;
    }
}

export async function choiceAction(e: Event, data: Word[], length: number, reload = false): Promise<Word[]> {
    let newData = data;
    const target = e.target as HTMLElement;
    const value = target.getAttribute('data');
    const action = checkAnswerSprintGame(GAME_BUTTONS[value as keyof typeof GAME_BUTTONS]);
    state.sprintGame.wordsLearnt += 1;
    setPoints(action);
    if (value && state.sprintGame.wordsLearnt < length) {
        setAnswerBlock(newData);
    } else if (reload && state.sprintGame.currentPage && value) {
        newData = await reloadNewWord();
        state.sprintGame.currentMaxLength += newData.length;
    } else {
        state.sprintGame.isGame = false;
    }
    return newData;
}
