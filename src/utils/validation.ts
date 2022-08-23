const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

function isEmailValid(value: string): boolean {
    return EMAIL_REGEXP.test(value);
}

// source: https://ru.hexlet.io/blog/posts/validatsiya-email-na-javascript (чтобы потом не рассказывали, что мы что-то откуда-то списали)

const PASS_REGEXP = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

function isPasswordValid(value: string) {
    return PASS_REGEXP.test(value);
}

function doPasswordsMatch(): boolean {
    const passwordField = document.querySelector('#password-field-reg') as HTMLInputElement;
    const confirmPasswordField = document.querySelector('#confirm-password') as HTMLInputElement;
    return passwordField.value === confirmPasswordField.value;
}

export { isEmailValid, isPasswordValid, doPasswordsMatch };
