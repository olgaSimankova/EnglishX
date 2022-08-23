import createElement from '../../../utils/createElement';

function getLevelsSection() {
    const textbookHeading = createElement({
        type: 'section',
        parentElement: document.body,
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
        classes: ['textbook_title'],
        text: 'Textbook',
    });

    createElement({
        type: 'p',
        parentElement: textbookHeading,
        classes: ['textbook_text'],
        text: 'Choose the words difficulty level',
    });
}

export default function getTextbookPage() {
    getLevelsSection();
}
