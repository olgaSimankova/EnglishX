import { API_BASE_LINK, WORDS } from '../constants/constants';
import { AggregatedResponse, Word, WordStats } from '../constants/types';
import state from '../state/state';

export async function getWords(group: number, page: number): Promise<Word[]> {
    const response = await fetch(`${WORDS}?group=${group}&page=${page}`);
    return response.json();
}

export async function getWordById(id: string): Promise<Word> {
    const response = await fetch(`${WORDS}/${id}`);
    return response.json();
}

export async function getWordStatistics(wordId: string): Promise<WordStats | void> {
    console.log(wordId);
    try {
        const { userId, token } = state.user;
        if (userId) {
            const response = await fetch(`${API_BASE_LINK}/users/${userId}/words/${wordId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            });
            if (response.status === 200) {
                return response.json();
            }
        }
    } catch {
        console.log('new entry of word statistics');
    }
    return undefined;
}

export async function setUserWordStats(
    wordId: string,
    optional: WordStats,
    flagUpdate = false
): Promise<WordStats | void> {
    const { userId, token } = state.user;
    if (userId) {
        const response = await fetch(`${API_BASE_LINK}/users/${userId}/words/${wordId}`, {
            method: !flagUpdate ? 'POST' : 'PUT',
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

export async function getUserAggregatedWords(group: number, filter: string): Promise<AggregatedResponse | void> {
    const { userId, token } = state.user;
    const response = await fetch(
        `${API_BASE_LINK}/users/${userId}/aggregatedWords?group=${group}&wordsPerPage=3600&filter=${filter}`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }
    );
    if (response.status === 200) {
        return response.json();
    }
    return undefined;
}

export async function getUserAggregatedWordsFromPage(
    page: number,
    group: number,
    filter: string
): Promise<AggregatedResponse | void> {
    const { userId, token } = state.user;
    const response = await fetch(
        `${API_BASE_LINK}/users/${userId}/aggregatedWords?group=${group}&page=${page}&wordsPerPage=20&filter=${filter}`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }
    );
    if (response.status === 200) {
        return response.json();
    }
    return undefined;
}
