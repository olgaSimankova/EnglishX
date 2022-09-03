import { getWords } from '../../../api/words';
import { API_BASE_LINK, WORD_CATEGORIES } from '../../../constants/constants';
import { Difficulty, GamesStat, GameTags, Levels, Word } from '../../../constants/types';
import applyLocalStorage from '../../../logic/main/applyLocalStorage';
import { checkTokenExpiration } from '../../../logic/main/authentication';
import listenPagination from '../../../logic/textbook/pagination';
import { listenLevelCards, listenTextbookAudio, listenWordCards } from '../../../logic/textbook/textbookEvents';
import getPaginationBtns from '../../../logic/textbook/utils/createPagination';
import getGameStats from '../../../logic/textbook/utils/gameStats';
import { listenDifficultWordBtn, listenTextbookTitleView } from '../../../logic/textbook/vocabulary';
import state from '../../../state/state';
import createElement from '../../../utils/createElement';
import createGamesSection from '../main/createGamesSection';

function getTextbookHeading(parent: HTMLElement): void {
    const textbookHeading = createElement({
        type: 'section',
        parentElement: parent,
        classes: ['heading_section'],
    });

    const textbookBtn = createElement({
        type: 'button',
        parentElement: textbookHeading,
        classes: ['textbook_title', 'title'],
        text: 'Textbook',
        attributes: [['id', 'textbook']],
    });

    const vocabularyBtn = createElement({
        type: 'button',
        parentElement: textbookHeading,
        classes: ['textbook_title', 'title'],
        text: 'Vocabulary',
        attributes: [['id', 'vocabulary']],
    });

    if (state.user.isAuthenticated && checkTokenExpiration()) {
        if (state.textBook.view === 'textbook') {
            textbookBtn.classList.add('active');
        } else {
            vocabularyBtn.classList.add('active');
        }
    } else {
        vocabularyBtn.classList.add('hidden');
    }

    createElement({
        type: 'p',
        parentElement: parent,
        classes: ['textbook_text'],
        text: 'Choose the words difficulty level',
    });
}

function getLevelsSection(parent: HTMLElement): void {
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
        btn.id = `${index}`;
        if (index === +state.textBook.currentLevel) {
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
    listenLevelCards();
    listenTextbookTitleView();
}

function getWordCategories(parent: HTMLElement) {
    const categoriesWrapper = createElement({
        type: 'div',
        parentElement: parent,
        classes: ['word_categories_container'],
    });
    WORD_CATEGORIES.forEach((item) => {
        const btn = createElement({
            type: 'button',
            parentElement: categoriesWrapper,
            classes: ['word_category_button'],
        });
        createElement({
            type: 'h2',
            parentElement: btn,
            text: `${item}`,
        });
        createElement({
            type: 'p',
            parentElement: btn,
            text: `Words: 0`,
        });
        createElement({
            type: 'div',
            parentElement: btn,
            classes: ['circle_category'],
        });
    });
    categoriesWrapper.classList.toggle('hidden', state.textBook.view === 'textbook');
}

export function getWordsCards(words: Word[], parent: HTMLElement) {
    words.forEach((value: Word, index) => {
        const wordCard = createElement({
            type: 'button',
            parentElement: parent,
            classes: ['words__card', `words__card_${Levels[state.textBook.currentLevel]}`],
            attributes: [['id', `${index}`]],
        });
        if (index === 0) wordCard.classList.add('active');

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
        createElement({
            type: 'span',
            parentElement: wordCard,
            classes: ['difficult_word'],
        });
    });
}

export function getWordData(word: Word, parent: HTMLElement, stats?: GamesStat) {
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
        classes: ['word__word'],
        text: `${word.word}`,
    });
    createElement({
        type: 'h3',
        parentElement: wordAndTranslation,
        classes: ['word__translation'],
        text: `${word.wordTranslate}`,
    });
    createElement({
        type: 'span',
        parentElement: wordAndTranslation,
        classes: ['word__transcription'],
        text: `${word.transcription}`,
    });
    const audioBtn = createElement({
        type: 'button',
        parentElement: wordAndTranslation,
        classes: ['audio__wrapper'],
    });
    createElement({
        type: 'span',
        parentElement: audioBtn,
        classes: ['audio'],
    });
    const wordActions = createElement({
        type: 'div',
        parentElement: parent,
        classes: ['word__actions'],
    });
    createElement({
        type: 'button',
        parentElement: wordActions,
        classes: ['word__actions_btn', `words__actions_btn_${Levels[state.textBook.currentLevel]}`],
        text: 'difficult word',
        attributes: [['id', 'add_difficult_word']],
    });
    createElement({
        type: 'button',
        parentElement: wordActions,
        classes: ['word__actions_btn', `words__actions_btn_${Levels[state.textBook.currentLevel]}`],
        text: 'delete word',
    });
    createElement({
        type: 'button',
        parentElement: wordActions,
        classes: ['word__actions_btn', `words__actions_btn_${Levels[state.textBook.currentLevel]}`],
        text: 'already know it',
    });
    if (!state.user.isAuthenticated || !checkTokenExpiration()) wordActions.classList.add('hidden');

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
    const description = createElement({
        type: 'p',
        parentElement: wordDescription,
    });
    description.innerHTML = word.textMeaning;
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
    const example = createElement({
        type: 'p',
        parentElement: wordDescription,
    });
    example.innerHTML = word.textExample;
    createElement({
        type: 'p',
        parentElement: wordDescription,
        text: `${word.textExampleTranslate}`,
    });

    const answersInGames = createElement({
        type: 'div',
        parentElement: wordDescription,
        classes: ['answers_in_games'],
    });

    createElement({
        type: 'h3',
        parentElement: answersInGames,
        classes: ['word__subheading'],
        text: 'Answers in games',
    });
    const answersContainer = createElement({
        type: 'div',
        parentElement: answersInGames,
        classes: ['answers__games_container'],
    });
    let sprint = 'SprintGame: 0 / 0';
    let audio = 'AudioCallGame: 0 / 0';
    if (stats) {
        sprint = getGameStats(stats, GameTags.sprintGame);
        audio = getGameStats(stats, GameTags.audioCallGame);
    }
    createElement({
        type: 'span',
        parentElement: answersContainer,
        classes: ['sprint_answers'],
        text: sprint,
    });
    createElement({
        type: 'span',
        parentElement: answersContainer,
        classes: ['audio_call_answers'],
        text: audio,
    });
    if (!state.user.isAuthenticated) answersInGames.classList.add('hidden');
    listenTextbookAudio();
    listenDifficultWordBtn();
}

async function getWordsSection(parent: HTMLElement): Promise<void> {
    createElement({
        type: 'h1',
        parentElement: parent,
        classes: ['title', 'words_title'],
        text: `Words`,
    });
    const wordsSection = createElement({
        type: 'section',
        parentElement: parent,
        classes: ['words__section'],
    });
    state.textBook.wordsOnPage = await getWords(state.textBook.currentLevel, state.textBook.currentPage - 1);
    const wordsContainer = createElement({
        type: 'div',
        parentElement: wordsSection,
        classes: ['words__contaiter'],
    });
    getWordsCards(state.textBook.wordsOnPage, wordsContainer);

    const wordInfo = createElement({
        type: 'div',
        parentElement: wordsSection,
        classes: ['word__detail'],
    });
    getWordData(state.textBook.wordsOnPage[0], wordInfo);
    listenWordCards();
}

function getPaginationSection(parent: HTMLElement) {
    const paginationWrapper = createElement({
        type: 'div',
        parentElement: parent,
        classes: ['pagination_wrapper'],
    });
    const ul = createElement({
        type: 'ul',
        parentElement: paginationWrapper,
        classes: ['pagination'],
    });
    getPaginationBtns(ul);
    listenPagination();
}

export async function getTextbookPage() {
    applyLocalStorage();
    const wrapper = createElement({
        type: 'div',
        parentElement: document.body,
        classes: ['wrapper'],
    });
    getTextbookHeading(wrapper);
    getLevelsSection(wrapper);
    getWordCategories(wrapper);
    await getWordsSection(wrapper);
    getPaginationSection(wrapper);
    createGamesSection(wrapper);
}
