import createElement from '../../utils/createElement';
import { FOOTER_LINKS_TEXT, GAMES, GAMES_LINKS, SITEMAP_LINKS, TEAM_INFO } from '../../constants/constants';

export default function createFooter(parent: HTMLElement): void {
    const footer = createElement({
        type: 'footer',
        parentElement: parent,
        classes: ['footer'],
        attributes: [['id', 'footer']],
    });

    const container = createElement({
        type: 'div',
        parentElement: footer,
        classes: ['head__container'],
    });

    const footerWrapper = createElement({
        type: 'div',
        parentElement: container,
        classes: ['footer__wrapper'],
    });

    const footerInfo = createElement({
        type: 'div',
        parentElement: footerWrapper,
        classes: ['footer__info'],
    });

    createElement({
        type: 'div',
        parentElement: footerInfo,
        classes: ['footer__logo'],
    });

    const text = createElement({
        type: 'p',
        parentElement: footerInfo,
        classes: ['footer__text'],
    });

    text.innerHTML = `EnglishX is a unique project, developed for RSSchool. Our team of 3 developers and one great mentor has created a product we hope you'll enjoy. <br>If you have any further questions please don't hesitate to contact us.`;

    const siteMap = createElement({
        type: 'div',
        parentElement: footerWrapper,
        classes: ['footer__sitemap'],
    });

    createElement({
        type: 'div',
        parentElement: siteMap,
        classes: ['footer__title'],
        text: 'SITE MAP',
    });

    FOOTER_LINKS_TEXT.forEach((value, index) => {
        createElement({
            type: 'a',
            parentElement: siteMap,
            classes: ['footer__link'],
            text: value,
            attributes: [['href', SITEMAP_LINKS[index]]],
        });
    });

    const footerGames = createElement({
        type: 'div',
        parentElement: footerWrapper,
        classes: ['footer__games'],
    });

    createElement({
        type: 'div',
        parentElement: footerGames,
        classes: ['footer__title'],
        text: 'GAMES',
    });

    GAMES_LINKS.forEach((link, index) => {
        const { name } = GAMES[index];

        createElement({
            type: 'a',
            parentElement: footerGames,
            classes: ['footer__link'],
            text: name,
            attributes: [
                ['href', link],
                ['target', '_blank'],
            ],
        });
    });

    const footerContacts = createElement({
        type: 'div',
        parentElement: footerWrapper,
        classes: ['footer__contacts'],
    });

    createElement({
        type: 'div',
        parentElement: footerContacts,
        classes: ['footer__title'],
        text: 'CONTACT US',
    });

    TEAM_INFO.forEach((member) => {
        const { github } = member;

        createElement({
            type: 'a',
            parentElement: footerContacts,
            classes: ['footer__link', 'footer__link_github'],
            text: github.split('/').pop(),
            attributes: [
                ['href', github],
                ['target', '_blank'],
            ],
        });
    });

    const footerBottom = createElement({
        type: 'div',
        parentElement: footer,
        classes: ['footer__bottom'],
    });

    const footerContainer = createElement({
        type: 'div',
        parentElement: footerBottom,
        classes: ['footer__container'],
    });

    const message = createElement({
        type: 'p',
        parentElement: footerContainer,
        classes: ['footer__message'],
    });

    message.innerHTML = `© 2022 All rights reserved. Made with <span>by Team93 for RSSchool`;

    createElement({
        type: 'a',
        parentElement: footerContainer,
        classes: ['footer__got-top'],
        text: 'GO TO TOP',
        attributes: [['href', '#hero']],
    });
}
