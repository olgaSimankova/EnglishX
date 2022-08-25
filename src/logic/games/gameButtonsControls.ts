import state from '../../state/state';

function listenGameSound(): void {
    const container = document.querySelector('.sound-container');
    const sound = document.querySelector('.sound-container');
    container?.addEventListener('click', () => {
        sound?.classList.toggle('crossed');
        state.controls.isSound = !state.controls.isSound;
    });
}

export default function gameButtonsControls(): void {
    listenGameSound();
}
