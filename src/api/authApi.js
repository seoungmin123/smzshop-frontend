import axiosInstance from './axiosInstance';

export const authApi = {
    login: (credentials) =>
        axiosInstance.post('/auth/login',credentials),

    logout: () =>
        axiosInstance.get('/auth/logout'),

    checkAuth: () =>
        axiosInstance.get('/auth/me'),
};