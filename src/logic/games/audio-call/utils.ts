import { Choice, Word } from '../../../constants/types';
import state from '../../../state/state';
import getRandomNumber from '../../../utils/randomize';
import { ANSWER_OPTIONS_COUNT } from '../../../constants/constants';
import { playChoiceSound } from '../../../utils/playAudio';
import { answerOptionHandler } from './controller';

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

const showWordInfo = (): void => {
    const soundIcon = document.getElementById('sound-big') as HTMLElement;
    const image = document.querySelector('.card') as HTMLElement;
    const currentWord = document.querySelector('.audioCall__current-word') as HTMLElement;
    const nextButton = document.querySelector('.audioCall__answer') as HTMLElement;

    soundIcon.classList.add('hidden');
    image.classList.remove('hidden');
    currentWord.classList.remove('hidden');
    nextButton.innerText = 'NEXT';
};

const showRightAnswer = (userChoice: HTMLElement): void => {
    const answerBlock = document.querySelector('.audioCall__words') as HTMLElement;
    answerBlock.removeEventListener('click', answerOptionHandler);

    const rightAnswer = getRightAnswerElement();
    const userChoiceText = userChoice.getAttribute('data-word');
    const rightAnswerText = rightAnswer.getAttribute('data-word');
    rightAnswer.classList.add('right-answer');

    if (rightAnswerText === userChoiceText) {
        playChoiceSound(Choice.right);
    } else {
        userChoice.classList.add('wrong-answer');
        playChoiceSound(Choice.wrong);
    }
};

export { setLearningWord, setWords, setAnswerOptions, showWordInfo, getRightAnswerElement, showRightAnswer };
