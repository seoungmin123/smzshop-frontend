import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../StoreContext';
import Header from '../components/common/Header';

const DashboardPage = observer(() => {
    const { authStore } = useStore();

    return (
        <div>
            <Header />
            <div style={{ padding: '20px' }}>
                <h2>대시보드</h2>
                <p>환영합니다, {authStore.user?.username}님!</p>
                <div style={{ marginTop: '20px' }}>
                    <h3>사용자 정보</h3>
                    <pre>{JSON.stringify(authStore.user, null, 2)}</pre>
                </div>
            </div>
        </div>
    );
});

export default DashboardPage;
