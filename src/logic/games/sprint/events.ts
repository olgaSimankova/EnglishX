import removeClassElement from '../../../utils/removeClassElement';
import renderSprintGame from '../../../view/pages/games/sprint/renderSprintGame';

export default function listenLevelButtons(): void {
    const levelsContainer = document.querySelector('.level-container');
    levelsContainer?.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const data = target.getAttribute('data');
        if (data) {
            removeClassElement('level-button', 'active-level-button');
            target.classList.add('active-level-button');
            const startButton = document.querySelector('.start-button');
            startButton?.classList.add('active');
        }
    });
}

export function listerStartButton(): void {
    const startButton = document.querySelector('.start-button') as HTMLElement;
    const startScreen = document.querySelector('.start-screen') as HTMLElement;
    startButton?.addEventListener('click', () => {
        if (startButton.classList.contains('active')) {
            startScreen.style.display = 'none';
            const sprintContainer = document.querySelector('.sprint-container') as HTMLElement;
            if (sprintContainer) {
                renderSprintGame(sprintContainer);
            }
        }
    });
}
