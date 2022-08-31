import { getUserStatistics, setUserStatistics } from '../api/userStatistics';
import { GameTags, Stats, UserStatsResponse, Word } from '../constants/types';
import state from '../state/state';
import getDate from './getDate';

function createWordIdString(arr: Word[]): string {
    return arr
        .reduce(
            (acc, word) => {
                acc.result.push(word.word);
                return acc;
            },
            { result: [] as string[] }
        )
        .result.join('+');
}

function joinNewWords(newData: string, oldData: string): string {
    return [...new Set([...newData.split('+'), ...oldData.split('+')])].filter((el) => el).join('+');
}

function createNewWordList(currentStat: UserStatsResponse | void, goodAnswers: Word[], badAnswers: Word[]): string {
    let wordsString = createWordIdString(goodAnswers.concat(badAnswers));
    if (currentStat && currentStat.optional.wordList) {
        wordsString = joinNewWords(currentStat.optional.wordList, wordsString);
    }
    return wordsString;
}

function countNewWords(allWords: string, newWords: string): number {
    const allArr = allWords.split('+');
    const newArr = newWords.split('+');
    const total = [...new Set([...allArr, ...newArr])];
    return total.length - allArr.length;
}

function createNewStats(
    currentStat: UserStatsResponse | void,
    goodAnswers: Word[],
    badAnswers: Word[],
    tag: GameTags
): Stats {
    const wordsTrained = goodAnswers.concat(badAnswers);
    const date = getDate();
    if (currentStat && currentStat.optional.stats) {
        const { stats } = currentStat.optional;
        if (stats[date]) {
            const currNewWords = countNewWords(currentStat.optional.wordList, createWordIdString(wordsTrained));
            stats[date].newWords += currNewWords;
            stats[date].allWords += wordsTrained.length;
            stats[date].games[tag] = {
                right: (stats[date].games[tag]?.right || 0) + goodAnswers.length,
                wrong: (stats[date].games[tag]?.wrong || 0) + badAnswers.length,
                streak:
                    (stats[date].games[tag]?.streak || 0) < state[tag].bestStreak
                        ? state[tag].bestStreak
                        : stats[date].games[tag]?.streak || 0,
                newWords: (stats[date].games[tag]?.newWords || 0) + currNewWords,
            };
        } else {
            stats[date] = {
                newWords: wordsTrained.length,
                allWords: wordsTrained.length,
                games: {
                    [tag]: {
                        right: goodAnswers.length,
                        wrong: badAnswers.length,
                        streak: state[tag].bestStreak,
                        newWords: wordsTrained.length,
                    },
                },
            };
        }
        return stats;
    }
    return {
        [date]: {
            newWords: wordsTrained.length,
            allWords: wordsTrained.length,
            games: {
                [tag]: {
                    right: goodAnswers.length,
                    wrong: badAnswers.length,
                    streak: state[tag].bestStreak,
                    newWords: wordsTrained.length,
                },
            },
        },
    };
}

export default async function saveGameResults(goodAnswers: Word[], badAnswers: Word[], tag: GameTags): Promise<void> {
    const currentStatistics = await getUserStatistics();
    const wordListUpdated = createNewWordList(currentStatistics, goodAnswers, badAnswers);
    const statsUpdated = createNewStats(currentStatistics, goodAnswers, badAnswers, tag);
    const opt = {
        learnedWords: 0,
        optional: {
            stats: statsUpdated,
            wordList: wordListUpdated,
        },
    };
    setUserStatistics(opt);
}
