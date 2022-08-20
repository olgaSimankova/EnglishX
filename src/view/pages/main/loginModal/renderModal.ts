import loginModal from '../../../../logic/main/loginModal';
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
        text: 'Enter your email',
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
        type: 'input',
        parentElement: form,
        attributes: [
            ['type', 'checkbox'],
            ['name', 'keep_signed_in'],
            ['id', 'keep_signed_in'],
        ],
    });
    createElement({
        type: 'label',
        parentElement: form,
        text: 'Keep me signed in',
        attributes: [['for', 'keep_signed_in']],
    });
    createElement({
        type: 'a',
        parentElement: form,
        text: 'Forgot password?',
        attributes: [['href', '#']],
    });
    createElement({
        type: 'submit',
        parentElement: form,
        text: 'Forgot password?',
        attributes: [
            ['value', 'login'],
            ['id', 'login-form-submit'],
        ],
    });
}

//     <input type="password" name="password" id="password-field" class="login-form-field" placeholder="Password">
//     <input type="checkbox" name="keep_signed_in" id="keep_signed_in">
//     <label for="keep_signed_in">Keep me signed in</label>
//     <a href="#">Forgot password?</a>
//     <input type="submit" value="login" id="login-form-submit">`;
// }

export default function renderModal(): void {
    const modal = createElement({
        type: 'div',
        parentElement: document.body,
        classes: ['modal'],
        attributes: [['data-modal', 'login']],
    });
    createElement({
        type: 'span',
        parentElement: modal,
        classes: ['modal__cross'],
        text: '╳',
    });
    createElement({
        type: 'h3',
        parentElement: modal,
        classes: ['modal__title'],
        text: 'Sign In',
    });
    createElement({
        type: 'p',
        parentElement: modal,
        classes: ['modal_text'],
        text: 'Sign in to your account using email and password provided during registration',
    });
    renderLoginForm(modal);
    loginModal();
}
