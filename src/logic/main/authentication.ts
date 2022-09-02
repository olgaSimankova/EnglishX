import { TOKEN_EXPIRATION_TIME, USER_SAVED_FIELDS } from '../../constants/constants';
import { UserResponse } from '../../constants/types';
import state from '../../state/state';
import { getFromLocalStorage, removeFromLocalStorage, setLocalStorage } from '../../utils/localStorage';
import { toggleHeaderLoginView } from './loginModal';

export function saveTokenAndData(response: UserResponse): void {
    setLocalStorage('tokenTime', `${Date.now()}`);
    state.user.userId = response.userId;
    state.user.isAuthenticated = true;
    state.user.token = response.token;
    state.user.refreshToken = response.refreshToken;
    state.user.name = response.name;
    setLocalStorage('userId', response.userId);
    setLocalStorage('isAuthenticated', 'true');
    setLocalStorage('token', `${response.token}`);
    setLocalStorage('refreshToken', `${response.refreshToken}`);
    setLocalStorage('name', `${response.name}`);
}

export function checkTokenExpiration(): boolean {
    const timeNow = Date.now();
    const tokenTime = +getFromLocalStorage('tokenTime');
    return timeNow - tokenTime < TOKEN_EXPIRATION_TIME;
}

export function logOut(): void {
    state.user.isAuthenticated = false;
    state.user.token = '';
    state.user.refreshToken = '';
    USER_SAVED_FIELDS.forEach((field: string) => removeFromLocalStorage(field));
    toggleHeaderLoginView();
    location.reload();
}
