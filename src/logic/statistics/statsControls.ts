import Chart from 'chart.js/auto';
import { getUserStatistics } from '../../api/userStatistics';
import { UserStatsResponse } from '../../constants/types';
import state from '../../state/state';
import { getDataChart, getLabels, getNewWordsStats } from './utils';

export default function statisticsControls(data: UserStatsResponse | void): void {
    const chart = (document.getElementById('chart') as HTMLCanvasElement).getContext('2d');
    const toggle = document.querySelector('.toggle-button') as HTMLInputElement;
    if (chart) {
        const newWordsPerDay = getNewWordsStats(data);
        const labels = getLabels(newWordsPerDay);
        const dataChart = getDataChart(newWordsPerDay, labels, toggle.checked);
        const chartObj = new Chart(chart, {
            type: 'bar',
            data: {
                labels,
                datasets: [
                    {
                        label: 'New words',
                        data: dataChart,
                    },
                ],
            },
            options: {},
        });
        state.controls.chartID = chartObj;
    }
}

export async function listenToggle(): Promise<void> {
    const data = await getUserStatistics();
    document.querySelector('.toggle-button')?.addEventListener('change', () => {
        state.controls.chartID?.destroy();
        statisticsControls(data);
    });
}
