import { makeAutoObservable, runInAction } from 'mobx';
import { authApi } from '../api/authApi';

class AuthStore {
    user = null;
    isAuthenticated = false;
    isLoading = false;
    error = null;

    constructor() {
        makeAutoObservable(this);
        this.checkAuthStatus();
    }

    async login(credentials) {
        this.isLoading = true;
        this.error = null;

        try {
            const response = await authApi.login(credentials);
            runInAction(() => {
                //TODO
                this.user = response.data.user;
                this.isAuthenticated = true;
                localStorage.setItem('accessToken', response.data.token);
            });
        } catch (error) {
            runInAction(() => {
                this.error = error.response?.data?.message || '로그인 실패';
            });
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    async logout() {
        try {
            await authApi.logout();
        } catch (error) {
            console.error('로그아웃 에러:', error);
        } finally {
            runInAction(() => {
                this.user = null;
                this.isAuthenticated = false;
                localStorage.removeItem('accessToken');
            });
        }
    }

    async checkAuthStatus() {
        const token = localStorage.getItem('accessToken');
        if (!token) return;

        try {
            const response = await authApi.checkAuth();
            runInAction(() => {
                this.user = response.data;
                this.isAuthenticated = true;
            });
        } catch (error) {
            this.logout();
        }
    }
}

export default AuthStore;
