import { WORDS } from '../constants/constants';
import { Word } from '../constants/types';

export default async function getWords(group: number, page: number): Promise<Word[]> {
    const response = await fetch(`${WORDS}?group=${group}&page=${page}`);
    return response.json();
}
