import { registerModal } from '../../../../logic/main/registerModal';
import createElement from '../../../../utils/createElement';
import './modal.scss';

export default function renderRegistrationModal() {
    const modalContent = createElement({
        type: 'div',
        parentElement: document.body,
        classes: ['modal', 'active'],
        attributes: [
            ['data-modal', 'registration'],
            ['id', 'registration'],
        ],
    });
    createElement({
        type: 'span',
        parentElement: modalContent,
        classes: ['modal__cross_register'],
        text: '╳',
    });
    createElement({
        type: 'h3',
        parentElement: modalContent,
        classes: ['modal__title'],
        text: 'Sign Up',
    });
    createElement({
        type: 'p',
        parentElement: modalContent,
        classes: ['modal_text'],
        text: 'Registration takes less than a minute but gives you full control over your studying',
    });
    const form = createElement({
        type: 'form',
        parentElement: modalContent,
        classes: ['login-form', 'register-form'],
        attributes: [['id', 'registration-form']],
    });
    createElement({
        type: 'label',
        parentElement: form,
        text: 'Full Name',
        attributes: [['for', 'name']],
    });
    createElement({
        type: 'input',
        parentElement: form,
        classes: ['login-form-field'],
        attributes: [
            ['type', 'name'],
            ['name', 'name'],
            ['id', 'name-field'],
            ['placeholder', 'Your full name'],
        ],
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
        ],
    });
    createElement({
        type: 'label',
        parentElement: form,
        text: 'Confirm password',
        attributes: [['for', 'confirm-password']],
    });
    createElement({
        type: 'input',
        parentElement: form,
        classes: ['login-form-field'],
        attributes: [
            ['type', 'password'],
            ['name', 'confirm-password'],
            ['id', 'confirm-password'],
            ['placeholder', 'Password'],
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
        text: 'Remember me',
        attributes: [['for', 'keep_signed_in']],
    });

    createElement({
        type: 'submit',
        parentElement: form,
        text: 'Sign up',
        attributes: [
            ['value', 'login'],
            ['id', 'login-form-submit'],
        ],
    });

    const forgotPass = createElement({
        type: 'div',
        parentElement: form,
        classes: ['login-form__links-wrapper'],
    });

    createElement({
        type: 'span',
        parentElement: forgotPass,
        classes: ['modal_text'],
        text: 'Already have an account?',
    });

    createElement({
        type: 'a',
        parentElement: forgotPass,
        classes: ['link_colored', 'open_login_modal'],
        text: 'Sign in',
    });
    registerModal();
}
