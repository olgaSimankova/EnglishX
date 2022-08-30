import applyLocalStorage from '../../../utils/localStorage';
import renderStatisticsPage from './renderStatisticsPage';
import './statistics.scss';

function startStatisticsPage(): void {
    applyLocalStorage();
    renderStatisticsPage();
}

startStatisticsPage();
