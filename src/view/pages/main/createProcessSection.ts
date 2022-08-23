import createElement from '../../../utils/createElement';
import { LEARNING_STEPS } from '../../../constants/constants';

export default function createProcessSection(parent: HTMLElement): void {
    const processSection = createElement({
        type: 'section',
        parentElement: parent,
        classes: ['process'],
    });

    createElement({
        type: 'div',
        parentElement: processSection,
        classes: ['process__decor', 'process__decor_left'],
    });

    createElement({
        type: 'div',
        parentElement: processSection,
        classes: ['process__decor', 'process__decor_right'],
    });

    const container = createElement({
        type: 'div',
        parentElement: processSection,
        classes: ['hero__container'],
    });

    const wrapper = createElement({
        type: 'div',
        parentElement: container,
        classes: ['process__wrapper'],
    });

    createElement({
        type: 'p',
        parentElement: wrapper,
        classes: ['process_subtitle', 'subtitle'],
        text: 'Main steps',
    });

    createElement({
        type: 'h2',
        parentElement: wrapper,
        classes: ['process__title', 'title'],
        text: 'Online learning process',
    });

    const steps = createElement({
        type: 'div',
        parentElement: wrapper,
        classes: ['process__steps'],
    });

    LEARNING_STEPS.forEach((element, index) => {
        const { title, descr } = element;

        const step = createElement({
            type: 'div',
            parentElement: steps,
            classes: ['step'],
        });

        const stepCount = createElement({
            type: 'div',
            parentElement: step,
            classes: ['step__count'],
        });

        createElement({
            type: 'div',
            parentElement: stepCount,
            classes: ['round', 'round-count'],
        });

        stepCount.innerHTML += `0${index + 1}`;

        createElement({
            type: 'h3',
            parentElement: step,
            classes: ['step__title'],
            text: title,
        });

        createElement({
            type: 'p',
            parentElement: step,
            classes: ['step_descr'],
            text: descr,
        });
    });
}
