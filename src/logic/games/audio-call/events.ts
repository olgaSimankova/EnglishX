import { answerKeysHandler, answerOptionHandler, enterKeyHandler, nextButtonHandler, soundHandler } from './controller';
import { toggleAnimationClass } from './utils';

const setSoundEvent = (element: HTMLElement): void => {
    element.addEventListener('click', soundHandler);
};

const setAnswerEvent = (element: HTMLElement): void => {
    element.addEventListener('click', answerOptionHandler);
};

const setNextButtonEvent = (element: HTMLElement): void => {
    element.addEventListener('click', nextButtonHandler);
};

const soundAnimationEvent = (element: HTMLElement): void => {
    element.addEventListener('click', toggleAnimationClass);
};

const enterKeyEvent = (element: Document): void => {
    element.addEventListener('keydown', enterKeyHandler);
};

const answerKeysEvent = (element: Document): void => {
    element.addEventListener('keydown', answerKeysHandler);
};

export { setSoundEvent, setAnswerEvent, setNextButtonEvent, soundAnimationEvent, enterKeyEvent, answerKeysEvent };
