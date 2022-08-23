import createHeader from '../../common/createHeader';
import '../main/scss/style.scss';
import getTextbookPage from './createTextbookPage';
import './styles/textbook.scss';

function startTextbookPage(): void {
    createHeader(document.body);
    getTextbookPage();
}

startTextbookPage();
