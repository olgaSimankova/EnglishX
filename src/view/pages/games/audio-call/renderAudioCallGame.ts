import createElement from '../../../../utils/createElement';
import { Word } from '../../../../constants/types';
import { ANSWER_OPTIONS_COUNT } from '../../../../constants/constants';
import { setSoundEvent, setAnswerEvent } from '../../../../logic/games/audio-call/events';
import { setAnswerOptions, setLearningWord, setWords } from '../../../../logic/games/audio-call/utils';
import state from '../../../../state/state';
import { getFullPath } from '../../../../utils/playAudio';

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
        attributes: [['src', `${getFullPath(state.audioCallGame.learningWord?.image)}`]],
    });

    const currentWord = createElement({
        type: 'div',
        parentElement,
        classes: ['audioCall__current-word', 'hidden'],
        text: state.audioCallGame.learningWord?.word,
    });

    const soundSmall = createElement({
        type: 'div',
        parentElement: currentWord,
        classes: ['audioCall__sound', 'audioCall__sound_small'],
    });

    createElement({
        type: 'div',
        parentElement: soundSmall,
        classes: ['audioCall__icon'],
    });
    setSoundEvent(soundSmall);

    const soundBig = createElement({
        type: 'div',
        parentElement,
        classes: ['audioCall__sound'],
        attributes: [['id', 'sound-big']],
    });

    createElement({
        type: 'div',
        parentElement: soundBig,
        classes: ['audioCall__icon'],
    });
    setSoundEvent(soundBig);

    const words = createElement({
        type: 'div',
        parentElement,
        classes: ['audioCall__words'],
    });
    setAnswerEvent(words);

    const answerOptions = setAnswerOptions();
    for (let i = 0; i < ANSWER_OPTIONS_COUNT; i += 1) {
        createElement({
            type: 'div',
            parentElement: words,
            classes: ['audioCall__word'],
            text: `${i + 1}. ${answerOptions[i]}`,
            attributes: [['data-word', `${answerOptions[i]}`]],
        });
    }

    createElement({
        type: 'div',
        parentElement,
        classes: ['audioCall__answer'],
        text: `DON'T KNOW`,
    });
};

export default function renderAudioCallGame(parentElement: HTMLElement, data: Word[]): void {
    const gameContainer = createElement({
        type: 'div',
        parentElement,
        classes: ['audioCall-container'],
    });

    setWords(data);
    setLearningWord();
    renderQuestion(gameContainer);
}
