import React,{ useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../StoreContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = observer(() => {
    const { authStore } = useStore();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await authStore.login(credentials);
        if (authStore.isAuthenticated){
            navigate('/dashboard');
        }
    };

    return(
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="아이디"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
            />
            <input
                type="password"
                placeholder="비밀번호"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            />
            <button type="submit" disabled={authStore.isLoading}>
                {authStore.isLoading ? '로그인 중...' : '로그인'}
            </button>
            {authStore.error && <div className="error">{authStore.error}</div>}
        </form>
    );
});

export default LoginForm;
