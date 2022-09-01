import { API_BASE_LINK, WORDS } from '../constants/constants';
import { OptionalWord, Word, WordStatsResponse } from '../constants/types';
import state from '../state/state';

export default async function getWords(group: number, page: number): Promise<Word[]> {
    const response = await fetch(`${WORDS}?group=${group}&page=${page}`);
    return response.json();
}
export async function getWordStatistics(): Promise<WordStatsResponse | void> {
    try {
        const { userId, token } = state.user;
        if (userId) {
            const response = await fetch(`${API_BASE_LINK}/users/${userId}/words`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            });
            return response.json();
        }
    } catch {
        console.log('new entry of word statistics');
    }
    return undefined;
}

export async function setWordStatistics(wordId: string, optional: OptionalWord): Promise<WordStatsResponse | void> {
    const { userId, token } = state.user;
    if (userId) {
        const response = await fetch(`${API_BASE_LINK}/users/${userId}/words/${wordId}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(optional),
        });
        return response.json();
    }
    return undefined;
}
