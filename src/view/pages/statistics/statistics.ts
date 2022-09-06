import { toggleHeaderLoginView } from '../../../logic/main/loginModal';
import applyLocalStorage, { setLocalStorage } from '../../../utils/localStorage';
import renderModal from '../main/loginRegisterModal/renderModal';
import renderStatisticsPage from './renderStatisticsPage';
import './statistics.scss';

async function startStatisticsPage(): Promise<void> {
    applyLocalStorage();
    await renderStatisticsPage();
    toggleHeaderLoginView();
    renderModal();
    setLocalStorage('isFromTextBook', '');
    setLocalStorage('isFromVocabulary', '');
}

startStatisticsPage();
