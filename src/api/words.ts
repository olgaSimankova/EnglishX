import { WORDS } from '../constants/constants';
import { Word } from '../constants/types';

export async function getWords(group: number, page: number): Promise<Word[]> {
    const response = await fetch(`${WORDS}?group=${group}&page=${page}`);
    return response.json();
}

export async function getWord(wordId: string): Promise<Word> {
    const response = await fetch(`${WORDS}/${wordId}`);
    return response.json();
}
