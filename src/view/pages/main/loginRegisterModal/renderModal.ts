import { listenLoginModal } from '../../../../logic/main/loginModal';
import createElement from '../../../../utils/createElement';
import './modal.scss';

function renderLoginForm(parentElement: HTMLElement) {
    const form = createElement({
        type: 'form',
        parentElement,
        classes: ['login-form'],
        attributes: [['id', 'login-form']],
    });
    createElement({
        type: 'label',
        parentElement: form,
        text: 'Email',
        attributes: [['for', 'email']],
    });
    createElement({
        type: 'input',
        parentElement: form,
        classes: ['login-form-field'],
        attributes: [
            ['type', 'email'],
            ['name', 'email'],
            ['id', 'email-field'],
            ['placeholder', 'Your e-mail'],
        ],
    });
    createElement({
        type: 'label',
        parentElement: form,
        text: 'Password',
        attributes: [['for', 'password']],
    });
    createElement({
        type: 'input',
        parentElement: form,
        classes: ['login-form-field'],
        attributes: [
            ['type', 'password'],
            ['name', 'password'],
            ['id', 'password-field'],
            ['placeholder', 'Password'],
            ['autocomplete', 'current-password'],
            ['minlength', '8'],
            ['maxlength', '16'],
            ['title', 'minimum eight characters, at least one letter and one number'],
        ],
    });
    const linksWrapper = createElement({
        type: 'div',
        parentElement: form,
        classes: ['login-form__links-wrapper'],
    });
    createElement({
        type: 'input',
        parentElement: linksWrapper,
        attributes: [
            ['type', 'checkbox'],
            ['name', 'keep_signed_in'],
            ['id', 'keep_signed_in'],
        ],
    });
    createElement({
        type: 'label',
        parentElement: linksWrapper,
        text: 'Keep me signed in',
        attributes: [['for', 'keep_signed_in']],
    });
    createElement({
        type: 'a',
        parentElement: linksWrapper,
        classes: ['link_colored', 'link_forgot_pass'],
        text: 'Forgot password?',
        attributes: [['href', '#']],
    });

    createElement({
        type: 'div',
        parentElement: form,
        classes: ['wrong_pass_message'],
        text: 'Wrong email/password',
        attributes: [['style', 'visibility:hidden']],
    });

    createElement({
        type: 'input',
        parentElement: form,
        attributes: [
            ['type', 'submit'],
            ['value', 'Sign in'],
            ['id', 'login-form-submit'],
        ],
    });

    const noAccount = createElement({
        type: 'div',
        parentElement: form,
        classes: ['login-form__links-wrapper'],
    });

    createElement({
        type: 'span',
        parentElement: noAccount,
        classes: ['modal_text'],
        text: "Don't have an account?",
    });

    createElement({
        type: 'a',
        parentElement: noAccount,
        classes: ['link_colored', 'open_registration_modal'],
        text: 'Sign up',
    });
}

export default function renderModal(): void {
    createElement({
        type: 'div',
        parentElement: document.body,
        classes: ['modal_BG'],
    });
    const modalContent = createElement({
        type: 'div',
        parentElement: document.body,
        classes: ['modal'],
        attributes: [['data-modal', 'login']],
    });
    createElement({
        type: 'span',
        parentElement: modalContent,
        classes: ['modal__cross'],
        text: '╳',
    });
    createElement({
        type: 'h3',
        parentElement: modalContent,
        classes: ['modal__title'],
        text: 'Sign In',
    });
    createElement({
        type: 'p',
        parentElement: modalContent,
        classes: ['modal_text'],
        text: 'Sign in to your account using email and password provided during registration',
    });
    renderLoginForm(modalContent);
    listenLoginModal();
}
