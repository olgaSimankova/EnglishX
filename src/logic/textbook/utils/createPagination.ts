import { LAST_PAGE, PAGINATION_BTNS } from '../../../constants/constants';
import { Levels } from '../../../constants/types';
import state from '../../../state/state';
import createElement from '../../../utils/createElement';

export default function getPaginationBtns(parent: HTMLElement) {
    const PAGE_LESS_5 = state.textBook.currentPage < 5;
    const PAGE_MORE_5_LESS_END_MINUS_5 = state.textBook.currentPage >= 5 && state.textBook.currentPage <= LAST_PAGE - 4;
    for (let i = 0; i < PAGINATION_BTNS; i += 1) {
        const li = createElement({
            type: 'li',
            parentElement: parent,
            classes: ['pagination_element'],
        });
        const btn = createElement({
            type: 'button',
            parentElement: li,
            classes: ['pagination_btn', `pagination_btn_${Levels[state.textBook.currentLevel]}`],
            attributes: [['id', `${i}`]],
        });

        switch (i) {
            case 0:
                btn.innerText = `《`;
                btn.classList.add('left');
                if (state.textBook.currentPage === 1) btn.classList.add('disabled');
                break;
            case 1:
                btn.innerText = '1';
                if (state.textBook.currentPage === 1) btn.classList.add('active');
                break;
            case 2:
                if (PAGE_LESS_5) {
                    btn.innerText = `${i}`;
                    if (i === state.textBook.currentPage) btn.classList.add('active');
                } else {
                    btn.innerText = '...';
                    btn.classList.add('disabled');
                }
                break;
            case 3:
                if (PAGE_LESS_5) {
                    btn.innerText = `${i}`;
                    if (i === state.textBook.currentPage) btn.classList.add('active');
                } else if (PAGE_MORE_5_LESS_END_MINUS_5) {
                    btn.innerText = `${state.textBook.currentPage - 1}`;
                } else {
                    btn.innerText = `${LAST_PAGE - PAGINATION_BTNS + 2 + i}`;
                    if (btn.innerText === `${state.textBook.currentPage}`) btn.classList.add('active');
                }
                break;
            case 4:
                if (PAGE_LESS_5) {
                    btn.innerText = `${i}`;
                    if (i === state.textBook.currentPage) btn.classList.add('active');
                } else if (PAGE_MORE_5_LESS_END_MINUS_5) {
                    btn.innerText = `${state.textBook.currentPage}`;
                    btn.classList.add('active');
                } else {
                    btn.innerText = `${LAST_PAGE - PAGINATION_BTNS + 2 + i}`;
                    if (btn.innerText === `${state.textBook.currentPage}`) btn.classList.add('active');
                }
                break;
            case 5:
                if (PAGE_LESS_5) {
                    btn.innerText = `${i}`;
                    if (i === state.textBook.currentPage) btn.classList.add('active');
                } else if (PAGE_MORE_5_LESS_END_MINUS_5) {
                    btn.innerText = `${state.textBook.currentPage + 1}`;
                } else {
                    btn.innerText = `${LAST_PAGE - PAGINATION_BTNS + 2 + i}`;
                    if (btn.innerText === `${state.textBook.currentPage}`) btn.classList.add('active');
                }
                break;
            case 6:
                if (PAGE_LESS_5 || PAGE_MORE_5_LESS_END_MINUS_5) {
                    btn.innerText = '...';
                    btn.classList.add('disabled');
                } else {
                    btn.innerText = `${LAST_PAGE - PAGINATION_BTNS + 2 + i}`;
                    if (btn.innerText === `${state.textBook.currentPage}`) btn.classList.add('active');
                }
                break;
            case 7:
                btn.innerText = `${LAST_PAGE}`;
                if (state.textBook.currentPage === LAST_PAGE) btn.classList.add('active');
                break;
            case 8:
                btn.innerText = '》';
                btn.classList.add('right');
                if (state.textBook.currentPage === LAST_PAGE) btn.classList.add('disabled');
                break;
            default:
                break;
        }
    }
}
