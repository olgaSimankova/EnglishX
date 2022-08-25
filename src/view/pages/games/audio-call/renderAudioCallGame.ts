import createElement from '../../../../utils/createElement';
import { Word } from '../../../../constants/types';
import { ANSWER_OPTIONS_COUNT } from '../../../../constants/constants';

const renderQuestion = (parentElement: HTMLElement) => {
    const card = createElement({
        type: 'div',
        parentElement,
        classes: ['card', 'hidden'],
    });

    const shadow = createElement({
        type: 'div',
        parentElement: card,
        classes: ['shadow'],
    });

    createElement({
        type: 'div',
        parentElement: shadow,
        classes: ['shadowImage'],
    });

    createElement({
        type: 'img',
        parentElement: card,
        classes: ['image'],
        attributes: [['src', 'https://rslang-team69.herokuapp.com/files/21_0405.jpg']],
    });

    const currentWord = createElement({
        type: 'div',
        parentElement,
        classes: ['audioCall__current-word', 'hidden'],
        text: 'clerk',
    });

    createElement({
        type: 'div',
        parentElement: currentWord,
        classes: ['audioCall__sound', 'audioCall__sound_small'],
    });

    createElement({
        type: 'div',
        parentElement,
        classes: ['audioCall__sound'],
    });

    const words = createElement({
        type: 'div',
        parentElement,
        classes: ['audioCall__words'],
    });

    for (let i = 0; i < ANSWER_OPTIONS_COUNT; i += 1) {
        createElement({
            type: 'div',
            parentElement: words,
            classes: ['audioCall__word'],
            text: `${i + 1}. Наслаждаться`,
        });
    }

    createElement({
        type: 'div',
        parentElement,
        classes: ['audioCall__answer'],
        text: `DON'T KNOW`,
    });
};

export default function renderAudioCallGame(parentElement: HTMLElement, data: Word[]) {
    const gameContainer = createElement({
        type: 'div',
        parentElement,
        classes: ['audioCall-container'],
    });

    renderQuestion(gameContainer);
}
