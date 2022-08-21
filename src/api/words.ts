import { WORDS } from '../constants/constants';
import { Word } from '../constants/types';

export default async function getWords(group: number, page: number): Promise<Word[]> {
    console.log(`${WORDS}?_group=${group}&_page=${page}`);
    const response = await fetch(`${WORDS}?group=${group}&page=${page}`);
    return response.json();
}
