import createElement from '../../../utils/createElement';
import { TEAM_INFO } from '../../../constants/constants';

export default function createOurTeamSection(parent: HTMLElement): void {
    const ourTeam = createElement({
        type: 'section',
        parentElement: parent,
        classes: ['our-team', 'hero__container'],
        attributes: [['id', 'team']],
    });

    const wrapper = createElement({
        type: 'div',
        parentElement: ourTeam,
        classes: ['our-team__wrapper'],
    });

    createElement({
        type: 'p',
        parentElement: wrapper,
        classes: ['our-team__subtitle', 'subtitle'],
        text: 'Best Developers are all here',
    });

    createElement({
        type: 'h2',
        parentElement: wrapper,
        classes: ['our-team__title', 'title'],
        text: 'Meet our team',
    });

    const cards = createElement({
        type: 'div',
        parentElement: wrapper,
        classes: ['our-team__cards'],
    });

    TEAM_INFO.forEach((member, index) => {
        const { name, descr, github, linkedIn } = member;

        const card = createElement({
            type: 'div',
            parentElement: cards,
            classes: ['card'],
        });

        const background = createElement({
            type: 'div',
            parentElement: card,
            classes: ['card__background'],
        });

        createElement({
            type: 'div',
            parentElement: background,
            classes: ['card__image', `card__image_${index}`],
        });

        const hover = createElement({
            type: 'div',
            parentElement: background,
            classes: ['card__hover'],
        });

        createElement({
            type: 'a',
            parentElement: hover,
            classes: ['card__github'],
            attributes: [
                ['href', github],
                ['target', '_blank'],
            ],
        });

        createElement({
            type: 'a',
            parentElement: hover,
            classes: ['card__linkedIn'],
            attributes: [
                ['href', linkedIn],
                ['target', '_blank'],
            ],
        });

        createElement({
            type: 'p',
            parentElement: card,
            classes: ['card__name'],
            text: name,
        });

        createElement({
            type: 'p',
            parentElement: card,
            classes: ['card__descr'],
            text: descr,
        });
    });
}
