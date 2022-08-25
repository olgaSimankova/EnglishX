import { FullScreenDocument } from '../../constants/types';
import state from '../../state/state';

function listenGameSound(): void {
    const container = document.querySelector('.sound-container');
    const sound = document.querySelector('.sound-container');
    container?.addEventListener('click', () => {
        sound?.classList.toggle('crossed');
        state.controls.isSound = !state.controls.isSound;
    });
}

function leaveFullScreen(doc: FullScreenDocument) {
    if (doc.exitFullscreen) doc.exitFullscreen();
    else if (doc.msExitFullscreen) doc.msExitFullscreen();
    else if (doc.mozCancelFullScreen) doc.mozCancelFullScreen();
    else if (doc.webkitExitFullscreen) doc.webkitExitFullscreen();
}

function goToFullscreen(): void {
    if (state.controls.isFullscreen) {
        document.documentElement.requestFullscreen();
    } else {
        leaveFullScreen(document);
    }
}

function listenGameFullscreen(): void {
    const container = document.querySelector('.fullscreen-container');
    container?.addEventListener('click', () => {
        state.controls.isFullscreen = !state.controls.isFullscreen;
        goToFullscreen();
    });
}

export default function gameButtonsControls(): void {
    listenGameSound();
    listenGameFullscreen();
}
