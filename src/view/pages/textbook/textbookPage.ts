import { toggleHeaderLoginView } from '../../../logic/main/loginModal';
import state from '../../../state/state';
import applyLocalStorage, { setLocalStorage } from '../../../utils/localStorage';
import createFooter from '../../common/createFooter';
import createHeader from '../../common/createHeader';
import renderModal from '../main/loginRegisterModal/renderModal';
import '../main/scss/style.scss';
import { getTextbookPage } from './createTextbookPage';
import './styles/textbook.scss';

(async function startTextbookPage() {
    setLocalStorage('isFromTextBook', 'true');
    setLocalStorage('isFromVocabulary', '');
    createHeader(document.body);
    applyLocalStorage();
    renderModal();
    toggleHeaderLoginView();
    (document.querySelector('.header') as HTMLElement).classList.remove('hero__container');
    await getTextbookPage();
    createFooter(document.body);
    setLocalStorage('currentWordsLevel', state.textBook.currentLevel.toString());
    setLocalStorage('currentTextBookPage', state.textBook.currentPage.toString());
})();
