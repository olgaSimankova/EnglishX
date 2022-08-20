import { loginUser } from './api/login-register';
import './global.scss';
import renderModal from './view/pages/main/loginModal/renderModal';
import renderMain from './view/pages/main/renderMain';
import './view/pages/main/scss/style.scss';

renderModal();

(function startMainPage() {
    renderMain();
})();
console.log('test');

const modal = document.querySelector('.modal') as HTMLElement;
modal.addEventListener('click', (event: Event) => {
    if ((event.target as HTMLInputElement).type === 'submit') {
        event.preventDefault();
        const loginForm = document.querySelector('form') as HTMLFormElement;
        const uesrEmail = loginForm.email.value;
        const password = loginForm.password.value;
        console.log(uesrEmail, password);
        loginUser({ email: uesrEmail, password });
    }
});