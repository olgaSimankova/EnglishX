import { toggleModal } from './loginModal';

function deleteRegisterModal(): void {
    const registerationModal = document.getElementById('registration') as HTMLElement;
    if (registerationModal) registerationModal.remove();
}

function registerModal(): void {
    (document.querySelector('.open_login_modal') as HTMLElement).addEventListener('click', () => deleteRegisterModal());
    (document.querySelector('.modal__cross_register') as HTMLElement).addEventListener('click', () => {
        deleteRegisterModal();
        toggleModal(false);
    });
    (document.querySelector('.modal_BG') as HTMLElement).addEventListener('click', () => deleteRegisterModal());
}

export { registerModal, deleteRegisterModal };
