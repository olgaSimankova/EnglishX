import createElement from '../../../../utils/createElement';

export default function renderSprint(): void {
    const sprintContainer = createElement({
        type: 'div',
        parentElement: document.body,
        classes: ['sprint-container', 'game-background'],
    });
}
