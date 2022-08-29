import Chart from 'chart.js/auto';

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
        console.log(chartObj);
    }
}
