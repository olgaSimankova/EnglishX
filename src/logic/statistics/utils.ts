import { DateWithWords, GameTags, UserStatsResponse } from '../../constants/types';
import getDate from '../../utils/getDate';

export function getNewTodaysWords(data: UserStatsResponse | void): string {
    const output = '0';
    const date = getDate();
    if (data && data.optional.stats[date]) {
        return data.optional.stats[date].newWords.toString();
    }
    return output;
}

export function getTodaysPersentage(data: UserStatsResponse | void): string {
    const output = '0';
    const date = getDate();
    if (data && data.optional.stats[date]) {
        const { games } = data.optional.stats[date];
        const right = (games.audioCallGame?.right || 0) + (games.sprintGame?.right || 0);
        const wrong = (games.audioCallGame?.wrong || 0) + (games.sprintGame?.wrong || 0);
        if (wrong + right) {
            return Math.floor((right / (wrong + right)) * 100).toString();
        }
    }
    return output;
}

export function getTrainedWordsToday(data: UserStatsResponse | void): string {
    const output = '0';
    const date = getDate();
    if (data && data.optional.stats[date]) {
        return data.optional.stats[date].allWords.toString();
    }
    return output;
}

export function getTrainedWordsGame(data: UserStatsResponse | void, tag: GameTags): string {
    const output = '0';
    const date = getDate();
    if (data && data.optional.stats[date] && data.optional.stats[date].games[tag]) {
        const { games } = data.optional.stats[date];
        return (games[tag]?.newWords || 0).toString();
    }
    return output;
}

export function getGamePersentage(data: UserStatsResponse | void, tag: GameTags): string {
    const output = '0';
    const date = getDate();
    if (data && data.optional.stats[date] && data.optional.stats[date].games[tag]) {
        const { games } = data.optional.stats[date];
        const right = games[tag]?.right || 0;
        const wrong = games[tag]?.wrong || 0;
        if (wrong + right) {
            return Math.floor((right / (wrong + right)) * 100).toString();
        }
    }
    return output;
}

export function getGameStreak(data: UserStatsResponse | void, tag: GameTags): string {
    const date = getDate();
    return (data?.optional.stats[date]?.games[tag]?.streak || 0).toString();
}

export function getNewWordsStats(data: UserStatsResponse | void): DateWithWords {
    const obj: DateWithWords = {};
    if (data) {
        Object.keys(data.optional.stats).forEach((date) => {
            obj[date] = data.optional.stats[date].newWords.toString();
        });
    }
    return obj;
}

export function getLabels(obj: DateWithWords): string[] {
    return Object.keys(obj)
        .map((el) => el.split('/').reverse().join('-'))
        .sort((a, b) => Number(new Date(a)) - Number(new Date(b)))
        .map((el) => el.split('-').reverse().join('/'));
}

export function getDataChart(obj: DateWithWords, keys: string[], flag: boolean): string[] {
    const output: string[] = [];
    keys.forEach((key) => {
        output.push(obj[key]);
    });
    if (flag) {
        return output.map((el, i) => (Number(el) + (Number(output[i - 1]) || 0)).toString());
    }
    return output;
}
