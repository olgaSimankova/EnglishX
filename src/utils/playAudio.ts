import { API_BASE_LINK } from '../constants/constants';

export default function playAudio(path: string): void {
    const audio = new Audio(path);
    audio.play();
}

export function getFullPath(pathFromObj: string): string {
    return `${API_BASE_LINK}/${pathFromObj}`;
}
