import { Word } from '../../../constants/types';
import state from '../../../state/state';
import getRandomNumber from '../../../utils/randomize';
import { ANSWER_OPTIONS_COUNT } from '../../../constants/constants';

const setWords = (data: Word[]): void => {
    state.audioCallGame.givenWords = data;
    state.audioCallGame.needLearnWords = data;
};

const getRightAnswerElement = (): HTMLElement => {
    const rightAnswer = state.audioCallGame.learningWord?.wordTranslate;
    return document.querySelector(`[data-word='${rightAnswer}']`) as HTMLElement;
};

const setAnswerOptions = (): Array<string> => {
    const { length } = state.audioCallGame.givenWords;
    const {
        audioCallGame: { givenWords },
    } = state;
    const {
        audioCallGame: { learningWord },
    } = state;
    const answerOptions: Array<string> = [];

    while (answerOptions.length < ANSWER_OPTIONS_COUNT) {
        const index = getRandomNumber(0, length);
        const { wordTranslate } = givenWords[index];
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
};

const showAnswer = (): void => {
    const soundIcon = document.getElementById('sound-big') as HTMLElement;
    const image = document.querySelector('.card') as HTMLElement;
    const currentWord = document.querySelector('.audioCall__current-word') as HTMLElement;
    const nextButton = document.querySelector('.audioCall__answer') as HTMLElement;

    soundIcon.classList.add('hidden');
    image.classList.remove('hidden');
    currentWord.classList.remove('hidden');
    nextButton.innerText = 'NEXT';
};

export { setLearningWord, setWords, setAnswerOptions, showAnswer, getRightAnswerElement };
