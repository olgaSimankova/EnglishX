import { toggleHeaderLoginView } from '../../../logic/main/loginModal';
import applyLocalStorage from '../../../utils/localStorage';
import renderModal from '../main/loginRegisterModal/renderModal';
import renderStatisticsPage from './renderStatisticsPage';
import './statistics.scss';

async function startStatisticsPage(): Promise<void> {
    applyLocalStorage();
    await renderStatisticsPage();
    toggleHeaderLoginView();
    renderModal();
}

startStatisticsPage();
