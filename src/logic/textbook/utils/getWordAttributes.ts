import { Word } from '../../../constants/types';

export default function getWordIdByName(data: Word[], word: string): string {
    const neededWord = data.filter((w) => w.word === word)[0];
    return Object.entries(neededWord).filter((atr) => atr[0] === '_id')[0][1];
}
