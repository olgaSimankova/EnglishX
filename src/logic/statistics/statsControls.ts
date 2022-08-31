import Chart from 'chart.js/auto';
import { DateWithWords, GameTags, UserStatsResponse } from '../../constants/types';
import getDate from '../../utils/getDate';

function getNewWordsStats(data: UserStatsResponse | void): DateWithWords {
    const obj: DateWithWords = {};
    if (data) {
        Object.keys(data.optional.stats).forEach((date) => {
            obj[date] = data.optional.stats[date].newWords.toString();
        });
    }
    return obj;
}

export default function statisticsControls(data: UserStatsResponse | void): void {
    const chart = (document.getElementById('chart') as HTMLCanvasElement).getContext('2d');
    const toggle = document.querySelector('.toggle-button') as HTMLInputElement;
    console.log(toggle.checked);
    if (chart) {
        const newWordsPerDay = getNewWordsStats(data);
        const labels = Object.keys(newWordsPerDay);
        console.log(newWordsPerDay);
        const chartObj = new Chart(chart, {
            type: 'bar',
            data: {
                labels,
                datasets: [
                    {
                        label: 'TAG1',
                        data: [1, 2, 3, 4, 5],
                    },
                ],
            },
            options: {},
        });
    }
}

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
