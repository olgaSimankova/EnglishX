import createElement from '../../../utils/createElement';
import renderModal from './loginRegisterModal/renderModal';
import createHeader from '../../common/createHeader';
import './scss/style.scss';
import createHeroSection from './createHeroSection';
import createOurTeamSection from './createOurTeamSection';
import createProcessSection from './createProcessSection';
import createGamesSection from './createGamesSection';
import createFooter from '../../common/createFooter';
import { toggleHeaderLoginView } from '../../../logic/main/loginModal';
import applyLocalStorage, { getFromLocalStorage, setLocalStorage } from '../../../utils/localStorage';

export default function renderMain(): void {
    const heroSection = createElement({
        type: 'section',
        parentElement: document.body,
        classes: ['hero'],
        attributes: [['id', 'hero']],
    });

    createHeader(heroSection);
    applyLocalStorage();
    renderModal();
    toggleHeaderLoginView();
    createHeroSection(heroSection);
    createOurTeamSection(document.body);
    createProcessSection(document.body);
    createGamesSection(document.body);
    createFooter(document.body);
    setLocalStorage('isFromTextBook', 'false');
    if (!getFromLocalStorage('isAlert')) {
        alert('PR c самооцениванием лежит в консоли. Приятного пользования программой :)');
    }
    setLocalStorage('isAlert', 'true');
    console.log('https://github.com/freshman10/RSLang-Team93/pull/1');
}
