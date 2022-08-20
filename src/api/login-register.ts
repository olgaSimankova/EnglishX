import { User } from '../constants/types';

const createUser = async (user: User) => {
    const rawResponse = await fetch('https://eng-guru.herokuapp.com/users', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    const content = await rawResponse.json();

    console.log(content);
};

const loginUser = async (user: User) => {
    const rawResponse = await fetch('https://eng-guru.herokuapp.com/signin', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    const content = await rawResponse.json();

    console.log(content);
};

export { createUser, loginUser };
