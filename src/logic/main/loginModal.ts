// const modal = document.querySelector('.modal') as HTMLElement;

import { INVALID_COLOR_RED, VALID_COLOR_GREEN } from '../../constants/constants';
import isEmailValid from '../../utils/validation';
import renderRegistrationModal from '../../view/pages/main/loginRegisterModal/renderRegistrationModal';

// modal.addEventListener('click', (event: Event) => {
//     if ((event.target as HTMLInputElement).type === 'submit') {
//         event.preventDefault();
//         const loginForm = document.querySelector('form') as HTMLFormElement;
//         console.log(loginForm.email.value, loginForm.password.value);
//         // loginUser({ email: loginForm.email.value, password: loginForm.password.value });
//     }
// });

function toggleModal(todo: boolean) {
    (document.querySelector('.modal') as HTMLElement).classList.toggle('active', todo);
    (document.querySelector('.modal_BG') as HTMLElement).classList.toggle('active', todo);
}

function loginModal(): void {
    const login = document.querySelector('.header__login') as HTMLElement;
    login.addEventListener('click', () => {
        toggleModal(true);
    });
    (document.querySelector('.modal_BG') as HTMLElement).addEventListener('click', () => {
        toggleModal(false);
    });
    (document.querySelector('.modal__cross') as HTMLElement).addEventListener('click', () => toggleModal(false));

    const emailField = document.querySelector('#email-field') as HTMLInputElement;
    emailField.addEventListener('keyup', () => {
        if (isEmailValid(emailField.value)) {
            emailField.style.backgroundColor = `${VALID_COLOR_GREEN}`;
        } else {
            emailField.style.backgroundColor = `${INVALID_COLOR_RED}`;
        }
    });
    (document.querySelector('.open_registration_modal') as HTMLElement).addEventListener('click', () => {
        renderRegistrationModal();
    });
}

export { loginModal, toggleModal };
