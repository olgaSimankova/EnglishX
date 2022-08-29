import { API_BASE_LINK, SOUNDS_ANSWER } from '../constants/constants';
import { Choice } from '../constants/types';
import state from '../state/state';

export default function playAudio(fullURLToServer: string): void {
    const audio = new Audio(fullURLToServer);
    audio.play();
}

export function getFullPath(pathFromObj?: string): string {
    return `${API_BASE_LINK}/${pathFromObj}`;
}

export function playChoiceSound(answer: Choice): void {
    if (state.controls.isSound) {
        new Audio(SOUNDS_ANSWER[answer]).play();
    }
}
