import createElement from '../../utils/createElement';

export default function renderGameButtons(parentElement: HTMLElement): void {
    const gameButtonsContainer = createElement({
        type: 'div',
        parentElement,
        classes: ['game-buttons'],
    });
    const closeLink = createElement({
        type: 'a',
        parentElement: gameButtonsContainer,
        classes: ['link-close'],
        attributes: [
            ['href', './textbook.html'],
            ['title', 'Go to textbook'],
        ],
    });
    const spanCloseContainer = createElement({
        type: 'div',
        parentElement: closeLink,
        classes: ['close-span-container'],
    });
    ['first-span', 'second-span'].forEach((span) => {
        createElement({
            type: 'span',
            parentElement: spanCloseContainer,
            classes: ['close-span', span],
        });
    });
    const fullScreenContainer = createElement({
        type: 'div',
        parentElement: gameButtonsContainer,
        classes: ['fullscreen-container'],
        attributes: [['title', 'fullscreen']],
    });
    createElement({
        type: 'img',
        parentElement: fullScreenContainer,
        classes: ['fullscreen-svg', 'game-icon'],
    });
    const soundContainer = createElement({
        type: 'div',
        parentElement: gameButtonsContainer,
        classes: ['sound-container'],
        attributes: [['title', 'toggle sound']],
    });
    createElement({
        type: 'img',
        parentElement: soundContainer,
        classes: ['sound-svg', 'game-icon'],
    });
}
