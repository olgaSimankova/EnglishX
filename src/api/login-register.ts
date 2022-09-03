import { API_BASE_LINK } from '../constants/constants';
import { User, UserResponse } from '../constants/types';
import state from '../state/state';

const createUser = async (user: User): Promise<UserResponse | undefined> => {
    let response;
    try {
        response = await fetch(`${API_BASE_LINK}/users`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        if (!response.ok) {
            const message = document.querySelector('.user-exist') as HTMLElement;
            message.style.visibility = 'visible';
            response = undefined;
        } else {
            response = response.json();
        }
    } catch (error) {
        console.error(error);
    }
    return response;
};

const loginUser = async (user: User): Promise<UserResponse> => {
    return (
        await fetch(`${API_BASE_LINK}/signin`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
    ).json();
};

export async function refreshToken(): Promise<UserResponse> {
    const { userId, token } = state.user;
    return (
        await fetch(`${API_BASE_LINK}/users/${userId}/tokens`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
    ).json();
}

export { createUser, loginUser };
