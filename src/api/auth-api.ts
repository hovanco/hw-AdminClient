import axios from './axios-client';

async function getUser(): Promise<any> {
    const url = '/authentication/v1/users/info';

    const response = await axios({
        url,
        method: 'GET',
    });

    return response;
}

async function loginWithEmail(data: any): Promise<any> {
    const response = await axios({
        method: 'POST',
        url: '/authentication/v1/signin',
        data,
    });

    return response;
}

export async function refreshAccessToken(refreshToken: string): Promise<any> {
    const response = await axios({
        method: 'POST',
        url: `/authentication/v1/auth/refresh-token`,
        data: {
            refreshToken,
        },
    });

    return response.data;
}

export async function logout(refreshToken: string): Promise<any> {
    const response = await axios({
        method: 'POST',
        url: '/authentication/v1/auth/logout',
        data: {
            refreshToken,
        },
    });

    return response.data;
}

const authApi = {
    getUser,
    loginWithEmail,
    refreshAccessToken,
    logout,
};

export default authApi;
