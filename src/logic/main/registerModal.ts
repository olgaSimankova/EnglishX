import { INVALID_COLOR_RED, VALID_COLOR_GREEN } from '../../constants/constants';
import { doPasswordsMatch, isEmailValid, isPasswordValid } from '../../utils/validation';
import { toggleModal } from './loginModal';

function deleteRegisterModal(): void {
    const registerationModal = document.getElementById('registration') as HTMLElement;
    if (registerationModal) registerationModal.remove();
}

function changeFieldBackgroundColor(field: HTMLInputElement): void {
    if (isPasswordValid(field.value) || isEmailValid(field.value)) {
        field.style.backgroundColor = `${VALID_COLOR_GREEN}`;
    } else {
        field.style.backgroundColor = `${INVALID_COLOR_RED}`;
    }
    if (field.value === '') field.style.backgroundColor = 'white';
}

function registerModal(): void {
    (document.querySelector('.open_login_modal') as HTMLElement).addEventListener('click', () => deleteRegisterModal());
    (document.querySelector('.modal__cross_register') as HTMLElement).addEventListener('click', () => {
        deleteRegisterModal();
        toggleModal(false);
    });
    (document.querySelector('.modal_BG') as HTMLElement).addEventListener('click', () => deleteRegisterModal());

    const emailField = document.querySelector('#email-field-reg') as HTMLInputElement;
    emailField.addEventListener('keyup', () => changeFieldBackgroundColor(emailField));

    const passwordField = document.querySelector('#password-field-reg') as HTMLInputElement;
    passwordField.addEventListener('keyup', () => {
        changeFieldBackgroundColor(passwordField);
    });

    const confirmPasswordField = document.querySelector('#confirm-password') as HTMLInputElement;
    confirmPasswordField.addEventListener('keyup', () => {
        if (doPasswordsMatch()) {
            changeFieldBackgroundColor(confirmPasswordField);
        } else {
            confirmPasswordField.style.backgroundColor = `${INVALID_COLOR_RED}`;
        }
    });
}

export { registerModal, deleteRegisterModal, changeFieldBackgroundColor };
