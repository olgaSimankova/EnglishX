import { getUserStatistics, setUserStatistics } from '../api/userStatistics';
import { GameStreak, GameTags, Stats, UserStatsResponse, Word } from '../constants/types';
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
            stats[date].newWords += countNewWords(currentStat.optional.wordList, createWordIdString(wordsTrained));
            stats[date].allWords += wordsTrained.length;
            stats[date].games[tag] = {
                right: (stats[date].games[tag]?.right || 0) + goodAnswers.length,
                wrong: (stats[date].games[tag]?.wrong || 0) + badAnswers.length,
            };
        } else {
            stats[date] = {
                newWords: wordsTrained.length,
                allWords: wordsTrained.length,
                games: {
                    [tag]: {
                        right: goodAnswers.length,
                        wrong: badAnswers.length,
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
                },
            },
        },
    };
}

function createGameStreak(currentStat: UserStatsResponse | void): GameStreak {
    return {
        sprintGame:
            (currentStat?.optional.games?.sprintGame || 0) > state.sprintGame.bestStreak
                ? currentStat?.optional.games?.sprintGame
                : state.sprintGame.bestStreak,
        audioCallGame:
            (currentStat?.optional.games?.audioCallGame || 0) > state.audioCallGame.bestStreak
                ? currentStat?.optional.games?.audioCallGame
                : state.audioCallGame.bestStreak,
    };
}

export default async function saveGameResults(goodAnswers: Word[], badAnswers: Word[], tag: GameTags): Promise<void> {
    const currentStatistics = await getUserStatistics();
    const wordListUpdated = createNewWordList(currentStatistics, goodAnswers, badAnswers);
    const statsUpdated = createNewStats(currentStatistics, goodAnswers, badAnswers, tag);
    const gameStreakUpdate = createGameStreak(currentStatistics);
    const opt = {
        learnedWords: 0,
        optional: {
            stats: statsUpdated,
            wordList: wordListUpdated,
            games: gameStreakUpdate,
        },
    };
    setUserStatistics(opt);
}
