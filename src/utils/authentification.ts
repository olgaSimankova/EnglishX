import state from '../state/state';
import { getFromLocalStorage } from './localStorage';

export default function setStateUserIsAuthentificated() {
    state.user.isAuthenticated = getFromLocalStorage('isAuthenticated') === 'true';
}
