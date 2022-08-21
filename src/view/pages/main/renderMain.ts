import createElement from '../../../utils/createElement';
import renderHeader from '../../common/renderHeader';
import renderModal from './loginRegisterModal/renderModal';
import './scss/style.scss';

export default function renderMain(): void {
    const heroSection = createElement({
        type: 'section',
        parentElement: document.body,
        classes: ['hero'],
    });
    renderHeader(heroSection);
    renderModal();
}
