import { API_BASE_LINK } from '../constants/constants';
import { User } from '../constants/types';

const createUser = async (user: User) => {
    const rawResponse = await fetch(`${API_BASE_LINK}/users`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    const content = await rawResponse.json();

    console.log(content);

    return content;
};

const loginUser = async (user: User): Promise<Response> => {
    const rawResponse = await fetch(`${API_BASE_LINK}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    const response = await rawResponse.json();

    console.log(response);

    return response;
};

export { createUser, loginUser };
