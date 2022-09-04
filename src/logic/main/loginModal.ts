import { loginUser } from '../../api/login-register';
import state from '../../state/state';
import renderRegistrationModal from '../../view/pages/main/loginRegisterModal/renderRegistrationModal';
import { checkTokenExpiration, logOut, saveTokenAndData } from './authentication';
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

export function loginListener() {
    toggleModal(true);
}

export function toggleHeaderLoginView(): void {
    const text = document.querySelector('.header__text') as HTMLElement;
    const iconLogout = document.querySelector('.header__logout') as HTMLElement;
    const login = document.querySelector('.header__login') as HTMLElement;
    if (state.user.isAuthenticated && checkTokenExpiration()) {
        iconLogout.classList.toggle('hidden', false);
        text.classList.toggle('hidden', true);
        iconLogout.addEventListener('click', () => logOut());
        login.removeEventListener('click', loginListener);
    } else {
        iconLogout.classList.toggle('hidden', true);
        text.classList.toggle('hidden', false);
        state.user.isAuthenticated = false;
        login.addEventListener('click', loginListener);
    }
}

function listenLoginModal(): void {
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
    const spinner = document.querySelector('.submit-spinner') as HTMLElement;
    modal.addEventListener('click', async (event: Event) => {
        if ((event.target as HTMLInputElement).type === 'submit') {
            event.preventDefault();
            const loginForm = document.querySelector('form') as HTMLFormElement;
            spinner.classList.toggle('submit-spinner_hide', false);
            try {
                const loginResponse = await loginUser({
                    email: loginForm.email.value,
                    password: loginForm.password.value,
                });
                spinner.classList.toggle('submit-spinner_hide', true);
                toggleModal(false);
                saveTokenAndData(loginResponse);
                toggleHeaderLoginView();
                window.location.reload(); // Пока так. Позже сюда пойдет функция, изменяющая вид текстбука при логине.
            } catch {
                toggleFailLoginMessage(true);
                spinner.classList.toggle('submit-spinner_hide', true);
            }
        }
    });
}

export { listenLoginModal, toggleModal };
