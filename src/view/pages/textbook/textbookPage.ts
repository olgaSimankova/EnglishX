import createHeader from '../../common/createHeader';
import '../main/scss/style.scss';
import { getTextbookPage } from './createTextbookPage';
import './styles/textbook.scss';

(async function startTextbookPage() {
    createHeader(document.body);
    (document.querySelector('.header') as HTMLElement).classList.remove('hero__container');
    await getTextbookPage();
})();
