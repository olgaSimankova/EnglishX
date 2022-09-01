import { createUser } from '../../api/login-register';
import { INVALID_COLOR_RED, VALID_COLOR_GREEN } from '../../constants/constants';
import { setLocalStorage } from '../../utils/localStorage';
import { doPasswordsMatch, isEmailValid, isPasswordValid } from '../../utils/validation';
import { toggleHeaderLoginView, toggleModal } from './loginModal';

function deleteRegisterModal(): void {
    const registerationModal = document.getElementById('registration') as HTMLElement;
    if (registerationModal) registerationModal.remove();
    document.body.classList.toggle('lock', false);
}

function changeFieldBackgroundColor(field: HTMLInputElement): void {
    if (isPasswordValid(field.value) || isEmailValid(field.value)) {
        field.style.backgroundColor = `${VALID_COLOR_GREEN}`;
    } else {
        field.style.backgroundColor = `${INVALID_COLOR_RED}`;
    }
    if (field.value === '') field.style.backgroundColor = 'white';
}

function listenRegisterModal(): void {
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

    const registerModal = document.getElementById('registration') as HTMLElement;
    registerModal.addEventListener('click', async (event: Event) => {
        if ((event.target as HTMLInputElement).type === 'submit') {
            event.preventDefault();
            const registerForm = document.querySelector('#registration-form') as HTMLFormElement;
            const userName = (document.querySelector('#name-field') as HTMLInputElement).value;
            if (isEmailValid(registerForm.email.value) && isPasswordValid(registerForm.password.value)) {
                await createUser({
                    name: userName,
                    email: registerForm.email.value,
                    password: registerForm.password.value,
                }).then((user) => {
                    setLocalStorage('userId', user.userId);
                    setLocalStorage('token', user.token);
                    setLocalStorage('isAuthenticated', 'true');
                    toggleHeaderLoginView();
                    deleteRegisterModal();
                    toggleModal(false);
                });
            } else {
                console.log('Incorrect email/password');
            }
        }
    });
}

export { listenRegisterModal, deleteRegisterModal, changeFieldBackgroundColor };
