import { WordStatus } from '../../../constants/types';
import state from '../../../state/state';
import renderLoading from '../../../view/common/loading/renderLoading';
import toggleWordActions from './toggleWordActions';

export default function toggleClassActiveButton(cls: string, id: string): void {
    const levelsCards = document.querySelectorAll(`.${cls}`);
    levelsCards.forEach((button) => {
        if (button.id === id) {
            button.classList.toggle('active', true);
        } else {
            button.classList.toggle('active', false);
        }
    });
}

export function disableWindow(): void {
    const loading = renderLoading(document.body);
    loading.classList.add('center-window');
    console.log('start Disabling');
    setTimeout(() => loading.remove(), 4000);
}

export function handleRestoreButtons(): void {
    if (state.textBook.currentWordStatus === WordStatus.weak) {
        toggleWordActions();
    }
}
