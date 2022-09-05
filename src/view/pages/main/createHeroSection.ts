import createElement from '../../../utils/createElement';

export default function createHeroSection(parent: HTMLElement): void {
    const heroMain = createElement({
        type: 'div',
        parentElement: parent,
        classes: ['hero__main', 'hero__container', 'main'],
    });

    const heroMainWrapper = createElement({
        type: 'div',
        parentElement: heroMain,
        classes: ['main__wrapper'],
    });

    const info = createElement({
        type: 'div',
        parentElement: heroMainWrapper,
        classes: ['main__info'],
    });

    const video = createElement({
        type: 'div',
        parentElement: info,
        classes: ['main-video'],
    });

    const videoButton = createElement({
        type: 'a',
        parentElement: video,
        classes: ['round', 'main-video__btn'],
        attributes: [
            ['href', 'https://youtu.be/2W0VOny_jLk'],
            ['data-fancybox', ''],
        ],
    });

    createElement({
        type: 'div',
        parentElement: videoButton,
        classes: ['main-video__play'],
    });

    createElement({
        type: 'p',
        parentElement: video,
        text: 'Watch tutorial',
    });

    createElement({
        type: 'h1',
        parentElement: info,
        classes: ['main__title'],
        text: 'Enjoy studying language with EnglishX App',
    });

    const buttons = createElement({
        type: 'div',
        parentElement: info,
        classes: ['main__buttons'],
    });

    createElement({
        type: 'a',
        parentElement: buttons,
        classes: ['main__button'],
        text: 'About us',
        attributes: [['href', '#team']],
    });

    createElement({
        type: 'a',
        parentElement: buttons,
        classes: ['main__button', 'main__button-filled'],
        text: 'Explore games',
        attributes: [['href', '#games']],
    });

    createElement({
        type: 'div',
        parentElement: heroMainWrapper,
        classes: ['main__img'],
    });

    const mainBottom = createElement({
        type: 'div',
        parentElement: heroMain,
        classes: ['main__bottom'],
    });

    const text = createElement({
        type: 'p',
        parentElement: mainBottom,
        classes: ['main__text'],
    });

    createElement({
        type: 'span',
        parentElement: text,
        text: '4',
    });

    text.innerHTML += 'Completed games';

    createElement({
        type: 'div',
        parentElement: mainBottom,
        classes: ['bullet'],
    });

    const text1 = createElement({
        type: 'p',
        parentElement: mainBottom,
        classes: ['main__text'],
    });

    createElement({
        type: 'span',
        parentElement: text1,
        text: '4000+',
    });

    text1.innerHTML += 'Different words';

    createElement({
        type: 'div',
        parentElement: mainBottom,
        classes: ['bullet'],
    });

    const text2 = createElement({
        type: 'p',
        parentElement: mainBottom,
        classes: ['main__text'],
    });

    createElement({
        type: 'span',
        parentElement: text2,
        text: '3',
    });

    text2.innerHTML += 'Awesome developers';

    createElement({
        type: 'div',
        parentElement: mainBottom,
        classes: ['bullet'],
    });

    const text3 = createElement({
        type: 'p',
        parentElement: mainBottom,
        classes: ['main__text'],
    });

    createElement({
        type: 'span',
        parentElement: text3,
        text: '6',
    });

    text3.innerHTML += 'Months of experience';
}
