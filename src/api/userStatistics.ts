import { API_BASE_LINK } from '../constants/constants';
import { UserStatsResponse } from '../constants/types';
import state from '../state/state';

export async function getUserStatistics(): Promise<UserStatsResponse | void> {
    const { userId, token } = state.user;
    try {
        if (userId && token) {
            const response = await fetch(`${API_BASE_LINK}/users/${userId}/statistics`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            });
            const data = await response.json();
            return data;
        }
    } catch {
        console.log('new entry of users statistics');
    }
    return undefined;
}

export async function setUserStatistics(optional: UserStatsResponse): Promise<UserStatsResponse | void> {
    const { userId, token } = state.user;
    if (userId && token) {
        const response = await fetch(`${API_BASE_LINK}/users/${userId}/statistics`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(optional),
        });
        const data = await response.json();
        console.log(response);
        return data;
    }
    return undefined;
}
