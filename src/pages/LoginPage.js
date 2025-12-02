import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../StoreContext';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = observer(() => {
    const { authStore } = useStore();
    const navigate = useNavigate();

    useEffect(() => {
        // 이미 로그인되어 있으면 대시보드로 리다이렉트
        if (authStore.isAuthenticated) {
            navigate('/dashboard');
        }
    }, [authStore.isAuthenticated, navigate]);

    return (
        <div>
            <LoginForm />
        </div>
    );
});

export default LoginPage;
