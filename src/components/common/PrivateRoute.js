import React from 'react';
import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../StoreContext';

const PrivateRoute = observer(({ children }) => {
    const { authStore } = useStore();

    return authStore.isAuthenticated ? children : <Navigate to="/login" />;
});

export default PrivateRoute;
