const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

function isEmailValid(value: string) {
    return EMAIL_REGEXP.test(value);
}

// source: https://ru.hexlet.io/blog/posts/validatsiya-email-na-javascript

export default isEmailValid;
