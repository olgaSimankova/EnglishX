import { loginUser } from '../../api/login-register';
import state from '../../state/state';
import renderRegistrationModal from '../../view/pages/main/loginRegisterModal/renderRegistrationModal';
import { changeFieldBackgroundColor } from './registerModal';

function toggleModal(todo: boolean) {
    (document.querySelector('.modal') as HTMLElement).classList.toggle('active', todo);
    (document.querySelector('.modal_BG') as HTMLElement).classList.toggle('active', todo);
    document.body.classList.toggle('lock', todo);
}

function toggleFailLoginMessage(todo: boolean): void {
    const message = document.querySelector('.wrong_pass_message') as HTMLElement;
    message.style.visibility = todo ? 'visible' : 'hidden';
}

function listenLoginModal(): void {
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

    const modal = document.querySelector('.modal') as HTMLElement;
    modal.addEventListener('click', async (event: Event) => {
        if ((event.target as HTMLInputElement).type === 'submit') {
            event.preventDefault();
            const loginForm = document.querySelector('form') as HTMLFormElement;
            try {
                const loginResponse = await loginUser({
                    email: loginForm.email.value,
                    password: loginForm.password.value,
                });
                toggleModal(false);
                if (loginResponse.message === 'Authenticated') state.user.isAuthenticated = true;
                console.log(state.user.isAuthenticated);
            } catch {
                toggleFailLoginMessage(true);
            }
        }
    });
}

export { listenLoginModal, toggleModal };
