import applyLocalStorage from '../../../logic/main/applyLocalStorage';
import { toggleHeaderLoginView } from '../../../logic/main/loginModal';
import createFooter from '../../common/createFooter';
import createHeader from '../../common/createHeader';
import renderModal from '../main/loginRegisterModal/renderModal';
import '../main/scss/style.scss';
import { getTextbookPage } from './createTextbookPage';
import './styles/textbook.scss';

(async function startTextbookPage() {
    createHeader(document.body);
    applyLocalStorage();
    renderModal();
    toggleHeaderLoginView();
    (document.querySelector('.header') as HTMLElement).classList.remove('hero__container');
    await getTextbookPage();
    createFooter(document.body);
})();
