import state from '../../state/state';
import { getFromLocalStorage } from '../../utils/localStorage';

export default function applyLocalStorage(): void {
    const userId = getFromLocalStorage('userId');
    if (userId) {
        state.user.isAuthenticated = true;
        state.user.userId = userId;
        state.user.token = getFromLocalStorage('token');
    }
}
