import createElement from '../../../utils/createElement';
import createHeader from '../../common/createHeader';
import './scss/style.scss';
import createHeroSection from './createHeroSection';
import createOurTeamSection from './createOurTeamSection';
import createProcessSection from './createProcessSection';
import createGamesSection from './createGamesSection';
import createFooter from '../../common/createFooter';

export default function renderMain(): void {
    const heroSection = createElement({
        type: 'section',
        parentElement: document.body,
        classes: ['hero'],
        attributes: [['id', 'hero']],
    });

    createHeader(heroSection);
    createHeroSection(heroSection);
    createOurTeamSection(document.body);
    createProcessSection(document.body);
    createGamesSection(document.body);
    createFooter(document.body);
}
