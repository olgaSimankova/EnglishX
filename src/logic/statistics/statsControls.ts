import Chart from 'chart.js/auto';
import { GameTags, UserStatsResponse } from '../../constants/types';
import getDate from '../../utils/getDate';

export default function statisticsControls(): void {
    const chart = (document.getElementById('chart') as HTMLCanvasElement).getContext('2d');
    if (chart) {
        const chartObj = new Chart(chart, {
            type: 'bar',
            data: {
                labels: ['label1', 'label2', 'label3', 'label4'],
                datasets: [
                    {
                        label: 'TAG1',
                        data: [1, 2, 3, 4, 5],
                    },
                    {
                        label: 'TAG2',
                        data: [5, 3, 13, 44, 5],
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
        return ((games[tag]?.right || 0) + (games[tag]?.wrong || 0)).toString();
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
    return (data?.optional.games[tag] || 0).toString();
}
