import { PAGINATION_BTNS } from '../../constants/constants';
import { Levels } from '../../constants/types';
import state from '../../state/state';
import createElement from '../../utils/createElement';

export function getPaginationBtns(parent: HTMLElement) {
    for (let i = 0; i < PAGINATION_BTNS; i += 1) {
        const li = createElement({
            type: 'li',
            parentElement: parent,
            classes: ['pagination_element'],
        });
        const btn = createElement({
            type: 'button',
            parentElement: li,
            classes: ['pagination_btn'],
        });
        btn.classList.add(`pagination_btn_${Levels[state.textBook.currentLevel]}`);

        switch (i) {
            case 0:
                btn.innerText = `《`;
                if (state.textBook.currentPage === 1) btn.classList.add('disabled');
                break;
            case 1:
                btn.innerText = '1';
                btn.id = '1';
                if (state.textBook.currentPage === 1) btn.classList.add('active');
                break;
            case 7:
                btn.innerText = '30';
                btn.id = '30';
                if (state.textBook.currentPage === 30) btn.classList.add('active');
                break;
            case 8:
                btn.innerText = '》';
                if (state.textBook.currentPage === 30) btn.classList.add('disabled');
                break;

            default:
                if (state.textBook.currentPage < 5) {
                    btn.innerText = i === 6 ? '...' : `${i}`;
                    if (i === 6) btn.classList.add('disabled');
                    btn.id = `${i}`;
                } else if (state.textBook.currentPage >= 5 && state.textBook.currentPage <= 26) {
                    if (i === 2 || i === 6) {
                        btn.innerText = '...';
                        btn.classList.add('disabled');
                    } else if (i === 3) {
                        btn.innerText = `${state.textBook.currentPage - 1}`;
                    } else if (i === 4) {
                        btn.innerText = `${state.textBook.currentPage}`;
                        btn.classList.add('active');
                    } else {
                        btn.innerText = `${state.textBook.currentPage + 1}`;
                    }
                } else {
                    btn.innerText = i === 2 ? '...' : `${24 + i}`;
                    if (i === 2) btn.classList.add('disabled');
                    if (btn.innerText === `${state.textBook.currentPage + 1}`) btn.classList.add('active');
                }
        }
    }
}

export function Func() {
    console.log('func');
}
