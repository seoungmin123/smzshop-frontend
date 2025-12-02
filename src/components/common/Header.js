import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../StoreContext';
import { useNavigate } from 'react-router-dom';

const Header = observer(() => {
    const { authStore } = useStore();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await authStore.logout();
        navigate('/login');
    };

    return (
        <header style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>smzShop</h1>
                {authStore.isAuthenticated && (
                    <div>
                        <span>환영합니다, {authStore.user?.username}님</span>
                        <button onClick={handleLogout} style={{ marginLeft: '10px' }}>
                            로그아웃
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
});

export default Header;
