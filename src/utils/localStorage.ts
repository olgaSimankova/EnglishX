import state from '../state/state';

export function getFromLocalStorage(field: string): string {
    const storage = window.localStorage;
    return storage.getItem(field) || '';
}

export function setLocalStorage(field: string, data: string): void {
    const storage = window.localStorage;
    storage.setItem(field, data);
}

export function removeFromLocalStorage(field: string): void {
    const storage = window.localStorage;
    storage.removeItem(field);
}

export default function applyLocalStorage(): void {
    const userId = getFromLocalStorage('userId');
    const token = getFromLocalStorage('token');
    if (userId) {
        state.user.isAuthenticated = true;
        state.user.userId = userId;
    }
    if (token) {
        state.user.token = token;
    }
}
