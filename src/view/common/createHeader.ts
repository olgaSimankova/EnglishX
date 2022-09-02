import createElement from '../../utils/createElement';
import { BUTTON_NAMES, GAMES, HEADER_LINKS } from '../../constants/constants';
import burger from '../../logic/main/burger';

export function createDropList(): void {
    const gamesContainer = document.querySelector('.games-drop-down') as HTMLElement;
    gamesContainer.setAttribute('href', '../#games');
    const container = createElement({
        type: 'div',
        parentElement: gamesContainer,
        classes: ['drop-down-container'],
    });
    GAMES.forEach((game) => {
        createElement({
            type: 'a',
            parentElement: container,
            classes: ['header__link', 'reset-margin'],
            text: game.name,
            attributes: [['href', game.link]],
        });
    });
}

export default function createHeader(parent: HTMLElement): void {
    const header = createElement({
        type: 'header',
        parentElement: parent,
        classes: ['header', 'hero__container'],
    });

    const wrapper = createElement({
        type: 'div',
        parentElement: header,
        classes: ['header__wrapper'],
    });

    const burgerIcon = createElement({
        type: 'button',
        parentElement: wrapper,
        classes: ['menu__icon', 'icon-menu'],
    });

    createElement({
        type: 'span',
        parentElement: burgerIcon,
    });

    createElement({
        type: 'a',
        parentElement: wrapper,
        classes: ['header__logo'],
        attributes: [['href', './index.html#hero']],
    });

    const nav = createElement({
        type: 'nav',
        parentElement: wrapper,
    });

    const navList = createElement({
        type: 'ul',
        parentElement: nav,
        classes: ['header__nav'],
    });

    BUTTON_NAMES.forEach((value, index) => {
        const navLink = createElement({
            type: 'li',
            parentElement: navList,
            classes: ['header__link', `${value.toLocaleLowerCase().split(' ')[0]}-drop-down`],
        });
        createElement({
            type: 'a',
            parentElement: navLink,
            text: value,
            attributes: [['href', HEADER_LINKS[index]]],
        });
    });
    const loginWrapper = createElement({
        type: 'div',
        parentElement: header,
        classes: ['header__login__wrapper'],
    });

    const login = createElement({
        type: 'a',
        parentElement: loginWrapper,
        classes: ['header__login'],
        attributes: [['href', '#']],
    });

    createElement({
        type: 'div',
        parentElement: login,
        classes: ['header__icon'],
    });

    createElement({
        type: 'div',
        parentElement: login,
        classes: ['header__text'],
        text: 'Log in / Register',
    });

    createElement({
        type: 'div',
        parentElement: loginWrapper,
        classes: ['header__logout', 'hidden'],
    });

    burger();
    createDropList();
}
