import axios from 'axios';
import queryString from 'query-string';
import constants from '../constants';
import authApi from './auth-api';
import { getToken, checkToken, removeToken, getTokenLocal, setToken, IToken } from './token';

let isRefreshed = false;

const axiosClient = axios.create({
    baseURL: constants.URL_API,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    const token = getToken();

    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
    }
    // Handle token here ...
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }

        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !isRefreshed) {
            isRefreshed = true;

            const refreshToken = getToken('refreshToken');

            if (refreshToken) {
                const isValidRefreshToken = checkToken(refreshToken);

                if (!isValidRefreshToken) {
                    removeToken();
                    return Promise.reject(error);
                }

                try {
                    const response = await authApi.refreshAccessToken(refreshToken);
                    const { accessToken } = response;

                    const tokenLocal = getTokenLocal();

                    setToken({
                        token: {
                            ...(tokenLocal as IToken),
                            accessToken,
                        },
                        remember: true,
                    });

                    originalRequest._retry = true;

                    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

                    return axiosClient(originalRequest);
                } catch (err) {
                    if (err.response.status === 401) {
                        if (refreshToken) {
                            await authApi.logout(refreshToken);
                        }

                        removeToken();
                    }

                    return Promise.reject(err);
                }
            }

            return Promise.reject(error);
        }

        return Promise.reject(error);
    },
);

export default axiosClient;
