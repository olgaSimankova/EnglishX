import { CreateElementInterface } from '../constants/types';
import { WRONG_DATA } from '../constants/constants';

export default function createElement(options: CreateElementInterface): HTMLElement {
    const { type, parentElement, classes, text, attributes } = options;
    if (type && parentElement && typeof type === 'string' && parentElement instanceof HTMLElement) {
        const element: HTMLElement = document.createElement(type);
        if (classes) {
            element.classList.add(...classes);
        }
        element.textContent = text || '';
        if (attributes) {
            for (let i = 0; i < attributes.length; i += 1) {
                element.setAttribute(...attributes[i]);
            }
        }
        parentElement.appendChild(element);
        return element;
    }
    throw new Error(WRONG_DATA);
}
