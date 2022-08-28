import { answerOptionHandler, nextButtonHandler, soundHandler } from './controller';
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

export { setSoundEvent, setAnswerEvent, setNextButtonEvent, soundAnimationEvent };
