import { AudioCallStatus, Choice, GameTags, Word } from '../../../constants/types';
import state from '../../../state/state';
import getRandomNumber from '../../../utils/randomize';
import { ANSWER_OPTIONS_COUNT, GAME_LIMIT } from '../../../constants/constants';
import { playChoiceSound } from '../../../utils/playAudio';
import { answerOptionHandler } from './controller';
import renderResultPage from '../../../view/common/gameResult/renderGameResults';
import { renderQuestion } from '../../../view/pages/games/audio-call/renderAudioCallGame';
import { deleteHTMLElement } from '../../../utils/createElement';
import gameResultControls from '../../../view/common/gameResult/gameResultControls';
import { saveAnswerToDB } from '../sprint/controls';
import getWordIdByName from '../../textbook/utils/getWordAttributes';

const setWords = (data: Word[]): void => {
    state.audioCallGame.givenWords = data;
    state.audioCallGame.needLearnWords = data;
};

const getRightAnswerElement = (): HTMLElement => {
    const rightAnswer = state.audioCallGame.learningWord?.wordTranslate;
    return document.querySelector(`[data-word='${rightAnswer}']`) as HTMLElement;
};

const toggleAnimationClass = (event: Event): void => {
    const target = event.target as HTMLElement;
    target.classList.add('play-sound');

    setTimeout(() => {
        target.classList.remove('play-sound');
    }, 1000);
};

const isAnswerReceived = (): boolean => {
    return state.audioCallGame.status === AudioCallStatus.answerReceived;
};

const setAnswerOptions = (): Array<string> => {
    const answerOptions: Array<string> = [];
    const data = state.audioCallGame.wordsFromPage;
    const { length } = state.audioCallGame.wordsFromPage;
    const {
        audioCallGame: { learningWord },
    } = state;

    while (answerOptions.length < ANSWER_OPTIONS_COUNT) {
        const index = getRandomNumber(0, length);
        const { wordTranslate } = data[index];
        if (wordTranslate !== learningWord?.wordTranslate && !answerOptions.includes(wordTranslate)) {
            answerOptions.push(wordTranslate);
        }
    }

    const indexToInsert = getRandomNumber(0, answerOptions.length);
    answerOptions.splice(indexToInsert, 1, learningWord?.wordTranslate as string);

    return answerOptions;
};

const setLearningWord = (): void => {
    const { length } = state.audioCallGame.needLearnWords;
    const learningWordIndex = getRandomNumber(0, length);
    state.audioCallGame.learningWord = state.audioCallGame.needLearnWords.splice(learningWordIndex, 1).pop();
    state.audioCallGame.currentWordId = '';
    if (state.audioCallGame.learningWord) {
        state.audioCallGame.currentWordId =
            state.audioCallGame.learningWord?.id ||
            getWordIdByName([state.audioCallGame.learningWord], state.audioCallGame.learningWord?.word);
    }
};

const showWordInfo = (): void => {
    const soundIcon = document.getElementById('sound-big') as HTMLElement;
    const image = document.querySelector('.card') as HTMLElement;
    const currentWord = document.querySelector('.audioCall__current-word') as HTMLElement;
    const nextButton = document.querySelector('.audioCall__next') as HTMLElement;

    soundIcon.classList.add('hidden');
    image.classList.remove('hidden');
    currentWord.classList.remove('hidden');
    nextButton.innerText = 'NEXT';
};

const showResult = (userChoice: HTMLElement): void => {
    const {
        audioCallGame: { currentLearned, currentMistakes, learningWord },
    } = state;
    const rightAnswer = getRightAnswerElement();
    const userChoiceText = userChoice.getAttribute('data-word');
    const rightAnswerText = rightAnswer.getAttribute('data-word');

    rightAnswer.classList.add('right-answer');
    state.audioCallGame.wordsLearnt += 1;

    if (rightAnswerText === userChoiceText && isAnswerReceived()) {
        playChoiceSound(Choice.right);
        currentLearned.push(learningWord as Word);
        state.audioCallGame.currentStreak += 1;
        saveAnswerToDB(true, GameTags.audioCallGame);
    }

    if (rightAnswerText !== userChoiceText && isAnswerReceived()) {
        userChoice.classList.add('wrong-answer');
        playChoiceSound(Choice.wrong);
        currentMistakes.push(learningWord as Word);
        state.audioCallGame.bestStreak =
            state.audioCallGame.bestStreak < state.audioCallGame.currentStreak
                ? state.audioCallGame.currentStreak
                : state.audioCallGame.bestStreak;
        state.audioCallGame.currentStreak = 0;
        saveAnswerToDB(false, GameTags.audioCallGame);
    }
};

function handleUserAnswer(userChoice: HTMLElement): void {
    const answerBlock = document.querySelector('.audioCall__words') as HTMLElement;
    answerBlock.removeEventListener('click', answerOptionHandler);

    showResult(userChoice);
}

const checkEndGame = (): void => {
    const {
        audioCallGame: { wordsLearnt, needLearnWords, currentLearned, currentMistakes },
    } = state;

    if (wordsLearnt === GAME_LIMIT || !needLearnWords.length) {
        deleteHTMLElement('audioCall-container');
        renderResultPage('game-container', currentLearned, currentMistakes, GameTags.audioCallGame);
        gameResultControls();
        state.audioCallGame.bestStreak =
            state.audioCallGame.bestStreak < state.audioCallGame.currentStreak
                ? state.audioCallGame.currentStreak
                : state.audioCallGame.bestStreak;
        state.audioCallGame.currentStreak = 0;
    } else {
        const container = document.querySelector('.audioCall-container') as HTMLElement;
        setLearningWord();
        renderQuestion(container);
    }
};

export {
    setLearningWord,
    setWords,
    setAnswerOptions,
    showWordInfo,
    getRightAnswerElement,
    handleUserAnswer,
    checkEndGame,
    isAnswerReceived,
    toggleAnimationClass,
    showResult,
};
