import createElement from '../../../utils/createElement';
import { GAMES } from '../../../constants/constants';

export default function createGamesSection(parent: HTMLElement): void {
    const games = createElement({
        type: 'section',
        parentElement: parent,
        classes: ['games'],
        attributes: [['id', 'games']],
    });

    const container = createElement({
        type: 'div',
        parentElement: games,
        classes: ['hero__container'],
    });

    createElement({
        type: 'p',
        parentElement: container,
        classes: ['games__subtitle', 'subtitle'],
        text: 'Enjoy your studying!',
    });

    createElement({
        type: 'h2',
        parentElement: container,
        classes: ['games__title', 'title'],
        text: 'Our online games',
    });

    const gameCards = createElement({
        type: 'div',
        parentElement: container,
        classes: ['games__cards'],
    });

    GAMES.forEach((element, index) => {
        const { name, descr, link } = element;

        const game = createElement({
            type: 'a',
            parentElement: gameCards,
            classes: ['game'],
            attributes: [['href', `${link}`]],
        });

        createElement({
            type: 'div',
            parentElement: game,
            classes: ['game__image', `game__image_${index}`],
        });

        createElement({
            type: 'div',
            parentElement: game,
            classes: ['game__name', `game__name_${index}`],
            text: name,
        });

        createElement({
            type: 'div',
            parentElement: game,
            classes: ['game__descr'],
            text: descr,
        });

        createElement({
            type: 'div',
            parentElement: game,
            classes: ['game__play'],
            text: 'Play game',
        });

        createElement({
            type: 'div',
            parentElement: game,
            classes: ['game__arrow'],
        });
    });
}
