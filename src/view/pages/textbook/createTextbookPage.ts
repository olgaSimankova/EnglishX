import getWords from '../../../api/words';
import { API_BASE_LINK } from '../../../constants/constants';
import { Difficulty, Levels, Word } from '../../../constants/types';
import state from '../../../state/state';
import createElement from '../../../utils/createElement';

function getLevelsSection(parent: HTMLElement): void {
    const textbookHeading = createElement({
        type: 'section',
        parentElement: parent,
        classes: ['heading_section'],
    });

    createElement({
        type: 'div',
        parentElement: textbookHeading,
        classes: ['levels_section'],
    });

    createElement({
        type: 'h2',
        parentElement: textbookHeading,
        classes: ['textbook_title', 'title'],
        text: 'Textbook',
    });

    createElement({
        type: 'p',
        parentElement: textbookHeading,
        classes: ['textbook_text'],
        text: 'Choose the words difficulty level',
    });
    const levelsSection = createElement({
        type: 'div',
        parentElement: parent,
        classes: ['levels_wrapper'],
    });

    const levels: string[] = Object.keys(Levels).filter((value) => Number.isNaN(Number(value)));

    levels.forEach((item, index) => {
        const btn = createElement({
            type: 'button',
            parentElement: levelsSection,
            classes: ['level__button'],
        });
        if (index === state.textBook.levelChosen) {
            btn.classList.add('active');
        }
        const leftPart = createElement({
            type: 'div',
            parentElement: btn,
            classes: ['button__left_part'],
        });
        createElement({
            type: 'h2',
            parentElement: leftPart,
            text: `${Object.values(Difficulty)[index]}`,
        });
        createElement({
            type: 'p',
            parentElement: leftPart,
            text: `${Object.keys(Difficulty)[index]}`,
        });

        const rightPart = createElement({
            type: 'div',
            parentElement: btn,
            classes: ['button__right_part'],
        });
        createElement({
            type: 'h2',
            parentElement: rightPart,
            text: `${item}`,
        });
        createElement({
            type: 'div',
            parentElement: btn,
            classes: ['circle'],
        });
    });
}

async function getWordsCards(words: Word[], parent: HTMLElement) {
    words.forEach((value: Word) => {
        const wordCard = createElement({
            type: 'button',
            parentElement: parent,
            classes: ['words__card'],
        });
        createElement({
            type: 'h2',
            parentElement: wordCard,
            classes: ['word__title'],
            text: value.word,
        });
        createElement({
            type: 'p',
            parentElement: wordCard,
            classes: ['word__translate'],
            text: value.wordTranslate,
        });
    });
}

async function getWordData(word: Word, parent: HTMLElement) {
    createElement({
        type: 'div',
        parentElement: parent,
        classes: ['word__img'],
        attributes: [['style', `background-image: url(${API_BASE_LINK}/${word.image})`]],
    });
    const wordAndTranslation = createElement({
        type: 'div',
        parentElement: parent,
    });
    createElement({
        type: 'h2',
        parentElement: wordAndTranslation,
        classes: [],
        text: `${word.word}`,
    });
    createElement({
        type: 'h3',
        parentElement: wordAndTranslation,
        classes: [],
        text: `${word.wordTranslate}`,
    });
    createElement({
        type: 'span',
        parentElement: wordAndTranslation,
        classes: [],
        text: `${word.transcription}`,
    });
    createElement({
        type: 'span',
        parentElement: wordAndTranslation,
        classes: ['audio'],
        text: `AUDIO`,
    });
    const wordActions = createElement({
        type: 'div',
        parentElement: parent,
        classes: ['word__actions'],
    });
    createElement({
        type: 'button',
        parentElement: wordActions,
        classes: ['word__actions_btn'],
        text: 'difficult word',
    });
    createElement({
        type: 'button',
        parentElement: wordActions,
        classes: ['word__actions_btn'],
        text: 'delete word',
    });

    const wordDescription = createElement({
        type: 'div',
        parentElement: parent,
        classes: ['word__description'],
    });
    createElement({
        type: 'h3',
        parentElement: wordDescription,
        classes: ['word__subheading'],
        text: 'Meaning',
    });
    createElement({
        type: 'p',
        parentElement: wordDescription,
        text: `${word.textMeaning}`,
    });
    createElement({
        type: 'p',
        parentElement: wordDescription,
        text: `${word.textMeaningTranslate}`,
    });
    createElement({
        type: 'h3',
        parentElement: wordDescription,
        classes: ['word__subheading'],
        text: 'Example',
    });
    createElement({
        type: 'p',
        parentElement: wordDescription,
        text: `${word.textExample}`,
    });
    createElement({
        type: 'p',
        parentElement: wordDescription,
        text: `${word.textExampleTranslate}`,
    });
    createElement({
        type: 'h3',
        parentElement: wordDescription,
        classes: ['word__subheading'],
        text: 'Answers in games',
    });
}

async function getWordsSection(parent: HTMLElement): Promise<void> {
    createElement({
        type: 'h1',
        parentElement: parent,
        text: `Words`,
    });
    const wordsSection = createElement({
        type: 'section',
        parentElement: parent,
        classes: ['words__section'],
    });
    const words: Word[] = await getWords(1, 1);
    const wordsContainer = createElement({
        type: 'div',
        parentElement: wordsSection,
        classes: ['words__contaiter'],
    });
    await getWordsCards(words, wordsContainer);

    const wordInfo = createElement({
        type: 'div',
        parentElement: wordsSection,
        classes: ['word__detail'],
    });
    await getWordData(words[0], wordInfo);
}

export default async function getTextbookPage() {
    const wrapper = createElement({
        type: 'div',
        parentElement: document.body,
        classes: ['wrapper'],
    });
    getLevelsSection(wrapper);
    // await getWordsSection();
}
