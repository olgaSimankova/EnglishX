// const modal = document.querySelector('.modal') as HTMLElement;

import isEmailValid from '../../utils/validation';

// modal.addEventListener('click', (event: Event) => {
//     if ((event.target as HTMLInputElement).type === 'submit') {
//         event.preventDefault();
//         const loginForm = document.querySelector('form') as HTMLFormElement;
//         console.log(loginForm.email.value, loginForm.password.value);
//         // loginUser({ email: loginForm.email.value, password: loginForm.password.value });
//     }
// });

function toggleModal() {
    (document.querySelector('.modal') as HTMLElement).classList.toggle('active');
}

export default function loginModal(): void {
    const login = document.querySelector('.header__login') as HTMLElement;
    login.addEventListener('click', () => {
        toggleModal();
    });

    const emailField = document.querySelector('#email-field') as HTMLInputElement;
    emailField.addEventListener('keyup', () => {
        if (isEmailValid(emailField.value)) {
            emailField.style.backgroundColor = 'lightgreen';
        } else {
            emailField.style.backgroundColor = 'pink';
        }
    });
}
