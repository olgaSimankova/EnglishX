// const modal = document.querySelector('.modal') as HTMLElement;
import renderRegistrationModal from '../../view/pages/main/loginRegisterModal/renderRegistrationModal';
import { changeFieldBackgroundColor } from './registerModal';

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
    emailField.addEventListener('keyup', () => changeFieldBackgroundColor(emailField));
    const passwordField = document.querySelector('#password-field') as HTMLInputElement;
    passwordField.addEventListener('keyup', () => {
        changeFieldBackgroundColor(passwordField);
    });

    (document.querySelector('.open_registration_modal') as HTMLElement).addEventListener('click', () => {
        renderRegistrationModal();
    });
}

export { loginModal, toggleModal };
