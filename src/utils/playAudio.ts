import { API_BASE_LINK, SOUNDS_ANSWER } from '../constants/constants';
import { Choice } from '../constants/types';

export default function playAudio(fullURLToServer: string): void {
    const audio = new Audio(fullURLToServer);
    audio.play();
}

export function getFullPath(pathFromObj: string): string {
    return `${API_BASE_LINK}/${pathFromObj}`;
}

export function playChoiceSound(answer: Choice): void {
    new Audio(SOUNDS_ANSWER[answer]).play();
}
