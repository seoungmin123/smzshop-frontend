import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from './StoreContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import Calendar from './components/Calendar';
import './App.css';

const PrivateRoute = observer(({ children }) => {
    const { authStore } = useStore();
    return authStore.isAuthenticated ? children : <Navigate to="/login" />;
});

const App = observer(() => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <DashboardPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/calendar"
                    element={
                        <PrivateRoute>
                            <Calendar />
                        </PrivateRoute>
                    }
                />
                <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>
        </BrowserRouter>
    );
});

export default App;