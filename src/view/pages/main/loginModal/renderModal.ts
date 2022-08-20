import createElement from '../../../../utils/createElement';

export default function renderModal(): void {
    const body = document.querySelector('body') as HTMLElement;
    const modal = createElement({
        type: 'div',
        parentElement: body,
        classes: ['modal'],
        attributes: [['data-modal', 'login']],
    });
    // убираем svg, делаем через BG
    modal.innerHTML = `<svg class="modal__cross" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/></svg>
    
    <h3 class="modal__title">Sign In</h3>
    <p class="modal_text">Sign in to your account using email and password provided during registration</p>`;

    const modalFormContainer = createElement({ type: 'div', parentElement: modal, classes: ['login-container'] });
    const form = createElement({
        type: 'form',
        parentElement: modalFormContainer,
        classes: ['login-form'],
        attributes: [['id', 'login-form']],
    });
    form.innerHTML = `<label for="email">Email</label>
    <input type="email" name="email" id="email-field" class="login-form-field" placeholder="Your e-mail">
    <label for="password">Password</label>
    <input type="password" name="password" id="password-field" class="login-form-field" placeholder="Password">
    <input type="checkbox" name="keep_signed_in" id="keep_signed_in">
    <label for="keep_signed_in">Keep me signed in</label>
    <a href="#">Forgot password?</a>
    <input type="submit" value="login" id="login-form-submit">`;
}
