import createElement from '../../../utils/createElement';
import './loading.scss';

export default function renderLoading(parentElement: HTMLElement): HTMLElement {
    const container = createElement({
        type: 'div',
        parentElement,
        classes: ['loading-container'],
    });
    return container;
}
