import createElement from '../../../utils/createElement';
import renderHeader from '../../common/renderHeader';
import './scss/style.scss';
import createHeroSection from './createHeroSection';
import createOurTeamSection from './createOurTeamSection';
import createProcessSection from './createProcessSection';

export default function renderMain(): void {
    const heroSection = createElement({
        type: 'section',
        parentElement: document.body,
        classes: ['hero'],
    });

    renderHeader(heroSection);
    createHeroSection(heroSection);
    createOurTeamSection(document.body);
    createProcessSection(document.body);
}
