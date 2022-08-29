import { API_BASE_LINK } from '../constants/constants';
import { OptionalUser, OptionalWord, UserStatsResponse, WordStatsResponse } from '../constants/types';
import state from '../state/state';

export async function getUserStatistics(): Promise<UserStatsResponse | void> {
    const { userId } = state.user;
    if (userId) {
        const response = await fetch(`${API_BASE_LINK}/users/${userId}/statistics`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        return response.json();
    }
    return undefined;
}

export async function setUserStatistics(optional: OptionalUser): Promise<UserStatsResponse | void> {
    const { userId } = state.user;
    if (userId) {
        const response = await fetch(`${API_BASE_LINK}/users/${userId}/statistics`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(optional),
        });
        return response.json();
    }
    return undefined;
}

export async function getWordStatistics(): Promise<WordStatsResponse | void> {
    const { userId } = state.user;
    if (userId) {
        const response = await fetch(`${API_BASE_LINK}/users/${userId}/words`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        return response.json();
    }
    return undefined;
}

export async function setWordStatistics(wordId: string, optional: OptionalWord): Promise<WordStatsResponse | void> {
    const { userId } = state.user;
    if (userId) {
        const response = await fetch(`${API_BASE_LINK}/users/${userId}/words/${wordId}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(optional),
        });
        return response.json();
    }
    return undefined;
}
