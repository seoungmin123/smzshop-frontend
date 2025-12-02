import { useStore } from '../StoreContext';

export const useAuth = () => {
    const { authStore } = useStore();

    return {
        user: authStore.user,
        isAuthenticated: authStore.isAuthenticated,
        isLoading: authStore.isLoading,
        error: authStore.error,
        login: authStore.login.bind(authStore),
        logout: authStore.logout.bind(authStore),
    };
};
