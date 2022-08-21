const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

function isEmailValid(value: string): boolean {
    return EMAIL_REGEXP.test(value);
}

// function isPasswordValid(value: string): boolean {

// }

// source: https://ru.hexlet.io/blog/posts/validatsiya-email-na-javascript

export default isEmailValid;
