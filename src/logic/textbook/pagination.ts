import state from '../../state/state';
import { updateWordsContainer } from './textbookEvents';
import getPaginationBtns from './utils/createPagination';

export default function listenPagination(): void {
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
