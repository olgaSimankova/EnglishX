import { FullScreenDocument } from '../../constants/types';
import state from '../../state/state';
import { getFromLocalStorage, setLocalStorage } from '../../utils/localStorage';

function listenGameSound(): void {
    const container = document.querySelector('.sound-container');
    const sound = document.querySelector('.sound-container');
    container?.addEventListener('click', () => {
        sound?.classList.toggle('crossed');
        state.controls.isSound = !state.controls.isSound;
        setLocalStorage('games_isSound', state.controls.isSound.toString());
    });
}

function leaveFullScreen(doc: FullScreenDocument) {
    if (doc.exitFullscreen) doc.exitFullscreen();
    else if (doc.msExitFullscreen) doc.msExitFullscreen();
    else if (doc.mozCancelFullScreen) doc.mozCancelFullScreen();
    else if (doc.webkitExitFullscreen) doc.webkitExitFullscreen();
}

export function goToFullscreen(): void {
    if (state.controls.isFullscreen) {
        document.documentElement.requestFullscreen();
    } else {
        leaveFullScreen(document);
    }
}

export function applyLocalStorageToGameButtons(): void {
    const isSound = getFromLocalStorage('games_isSound');
    if (isSound === 'false') {
        const sound = document.querySelector('.sound-container');
        sound?.classList.toggle('crossed');
        state.controls.isSound = false;
    }
}

function listenGameFullscreen(): void {
    const container = document.querySelector('.fullscreen-container');
    container?.addEventListener('click', () => {
        state.controls.isFullscreen = !state.controls.isFullscreen;
        goToFullscreen();
        setLocalStorage('games_isFullScreen', state.controls.isFullscreen.toString());
    });
}

export default function gameButtonsControls(): void {
    listenGameSound();
    listenGameFullscreen();
    applyLocalStorageToGameButtons();
}
