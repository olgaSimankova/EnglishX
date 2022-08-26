import { LAST_PAGE, PAGINATION_BTNS } from '../../constants/constants';
import { Levels } from '../../constants/types';
import state from '../../state/state';
import createElement from '../../utils/createElement';
import { updateWordsContainer } from './textbookEvents';

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
            classes: ['pagination_btn', `pagination_btn_${Levels[state.textBook.currentLevel]}`],
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
                if (state.textBook.currentPage < 5) {
                    btn.innerText = i === 6 ? '...' : `${i}`;
                    if (i === 6) btn.classList.add('disabled');
                    if (i === state.textBook.currentPage) btn.classList.add('active');
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
                    btn.innerText = i === 2 ? '...' : `${LAST_PAGE - PAGINATION_BTNS + 2 + i}`;
                    if (i === 2) btn.classList.add('disabled');
                    if (btn.innerText === `${state.textBook.currentPage}`) btn.classList.add('active');
                }
        }
    }
}

export function listenPagination(): void {
    const pagination = document.querySelector('.pagination') as HTMLElement;
    pagination.addEventListener('click', async (event: Event) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains('disabled') || !target.classList.contains('pagination_btn')) return;
        if (target.classList.contains('left')) {
            state.textBook.currentPage -= 1;
        } else if (target.classList.contains('right')) {
            state.textBook.currentPage += 1;
        } else {
            state.textBook.currentPage = Number(target.innerText);
        }
        pagination.innerHTML = '';
        getPaginationBtns(pagination);
        await updateWordsContainer();
    });
}
