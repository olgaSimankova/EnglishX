import applyLocalStorage from '../../../logic/main/applyLocalStorage';
import { toggleHeaderLoginView } from '../../../logic/main/loginModal';
import { setLocalStorage } from '../../../utils/localStorage';
import createFooter from '../../common/createFooter';
import createHeader from '../../common/createHeader';
import renderModal from '../main/loginRegisterModal/renderModal';
import '../main/scss/style.scss';
import { getTextbookPage } from './createTextbookPage';
import './styles/textbook.scss';

(async function startTextbookPage() {
    setLocalStorage('isFromTextBook', 'true');
    createHeader(document.body);
    applyLocalStorage();
    renderModal();
    toggleHeaderLoginView();
    (document.querySelector('.header') as HTMLElement).classList.remove('hero__container');
    await getTextbookPage();
    createFooter(document.body);
    setLocalStorage('currentWordsLevel', '0');
    setLocalStorage('currentTextBookPage', '1');
})();
