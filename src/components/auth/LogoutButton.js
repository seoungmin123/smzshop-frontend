import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../StoreContext';
import { useNavigate } from 'react-router-dom';

const LogoutButton = observer(() => {
    const { authStore } = useStore();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await authStore.logout();
        navigate('/login');
    };

    return (
        <button onClick={handleLogout}>
            로그아웃
        </button>
    );
});

export default LogoutButton;
