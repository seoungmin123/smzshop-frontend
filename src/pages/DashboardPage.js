import React from 'react';
import { Link } from 'react-router-dom';
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

                {/* 캘린더 링크 추가 */}
                <div style={{ marginTop: '20px' }}>
                    <Link to="/calendar" style={{
                        padding: '10px 20px',
                        background: '#3788d8',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '4px',
                        display: 'inline-block'
                    }}>
                        📅 캘린더 보기
                    </Link>
                </div>

                <div style={{ marginTop: '20px' }}>
                    <h3>사용자 정보</h3>
                    <pre>{JSON.stringify(authStore.user, null, 2)}</pre>
                </div>
            </div>
        </div>
    );
});

export default DashboardPage;