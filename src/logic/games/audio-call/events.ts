import { answerOptionHandler, soundHandler } from './controller';

const setSoundEvent = (element: HTMLElement): void => {
    element.addEventListener('click', soundHandler);
};

const setAnswerEvent = (element: HTMLElement): void => {
    element.addEventListener('click', answerOptionHandler);
};

export { setSoundEvent, setAnswerEvent };
