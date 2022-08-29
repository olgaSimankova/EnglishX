import { API_BASE_LINK, AUDIO_TYPES, SOUNDS_ANSWER } from '../constants/constants';
import { Choice, Word } from '../constants/types';
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

export function getAllAudios(): HTMLAudioElement[] {
    const currentWord = state.textBook.wordsOnPage[+state.textBook.currentWordId];
    console.log(currentWord);
    return AUDIO_TYPES.map((value: string) => {
        const pathFromObj = currentWord[value as keyof Word] as string;
        const fullPath = getFullPath(pathFromObj);
        return new Audio(fullPath);
    });
}

export function playAllAudio(...audio: HTMLAudioElement[]) {
    audio[0].play();
    for (let i = 0; i < audio.length - 1; i += 1) {
        audio[i].addEventListener('ended', () => {
            if (audio[i].duration === audio[i].currentTime) {
                audio[i + 1].play();
            }
        });
    }
}
