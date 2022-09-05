import state from '../../../state/state';
import { fillStateWithAllUserWords } from '../vocabulary';

export default async function removeDeletedWords(): Promise<void> {
    await fillStateWithAllUserWords();
    const deletedWords = state.user.aggregatedWords?.deleted?.map((word) => word.word);
    state.textBook.wordsOnPage = state.textBook.wordsOnPage.filter((word) => {
        return !deletedWords?.includes(word.word);
    });
}
