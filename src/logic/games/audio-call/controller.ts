import playAudio, { getFullPath } from '../../../utils/playAudio';
import state from '../../../state/state';
import { checkEndGame, getRightAnswerElement, handleUserAnswer, isAnswerReceived, showWordInfo } from './utils';
import { AudioCallStatus, Word } from '../../../constants/types';
import { AUDIOCALL_KEYBOARD_KEYS } from '../../../constants/constants';

const soundHandler = (): void => {
    const fullPath = getFullPath(state.audioCallGame.learningWord?.audio);

    playAudio(fullPath);
};

const answerOptionHandler = (event: Event): void => {
    const answer = event.target as HTMLElement;

    if (answer.classList.contains('audioCall__word')) {
        state.audioCallGame.status = AudioCallStatus.answerReceived;
        handleUserAnswer(answer);
        showWordInfo();
    }
};

const nextButtonHandler = (): void => {
    const {
        audioCallGame: { learningWord },
    } = state;
    const rightWord = getRightAnswerElement();

    if (!isAnswerReceived()) {
        handleUserAnswer(rightWord);
        showWordInfo();
        state.audioCallGame.status = AudioCallStatus.answerReceived;
        state.audioCallGame.currentMistakes.push(learningWord as Word);
    } else {
        checkEndGame();
        state.audioCallGame.status = AudioCallStatus.waitingAnswer;
    }
};

const enterKeyHandler = (event: KeyboardEvent): void => {
    if (event.key === 'Enter') nextButtonHandler();
};

const answerKeysHandler = (event: KeyboardEvent): void => {
    const answerOptions = document.querySelectorAll('.audioCall__word') as NodeList;

    if (AUDIOCALL_KEYBOARD_KEYS.includes(event.key)) {
        state.audioCallGame.status = AudioCallStatus.answerReceived;
        document.removeEventListener('keydown', answerKeysHandler);
        showWordInfo();
        handleUserAnswer(answerOptions[`${+event.key - 1}`] as HTMLElement);
    }
};

export { answerOptionHandler, soundHandler, nextButtonHandler, enterKeyHandler, answerKeysHandler };
