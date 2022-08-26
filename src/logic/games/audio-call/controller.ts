import playAudio, { getFullPath } from '../../../utils/playAudio';
import state from '../../../state/state';
import { showWordInfo, showRightAnswer } from './utils';

const soundHandler = (): void => {
    const fullPath = getFullPath(state.audioCallGame.learningWord?.audio);

    playAudio(fullPath);
};

const answerOptionHandler = (event: Event): void => {
    const answer = event.target as HTMLElement;

    if (answer.classList.contains('audioCall__word')) {
        showRightAnswer(answer);
        showWordInfo();
    }
};

export { answerOptionHandler, soundHandler };
