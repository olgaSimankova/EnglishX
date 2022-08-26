import playAudio, { getFullPath, playChoiceSound } from '../../../utils/playAudio';
import state from '../../../state/state';
import { getRightAnswerElement, showAnswer } from './utils';
import { Choice } from '../../../constants/types';

const soundHandler = (): void => {
    const fullPath = getFullPath(state.audioCallGame.learningWord?.audio);

    playAudio(fullPath);
};

const answerOptionHandler = (event: Event): void => {
    const answer = event.target as HTMLElement;

    if (answer.classList.contains('audioCall__word')) {
        const answerBlock = document.querySelector('.audioCall__words') as HTMLElement;
        answerBlock.removeEventListener('click', answerOptionHandler);

        const rightAnswer = getRightAnswerElement();
        const answerText = answer.getAttribute('data-word');
        const rightAnswerText = rightAnswer.getAttribute('data-word');
        rightAnswer.classList.add('right-answer');

        if (rightAnswerText === answerText) {
            playChoiceSound(Choice.right);
        } else {
            answer.classList.add('wrong-answer');
            playChoiceSound(Choice.wrong);
        }

        showAnswer();
    }
};

export { answerOptionHandler, soundHandler };
