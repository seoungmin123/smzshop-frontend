import React from 'react';
import RootStore from './stores/RootStore';

const StoreContext = React.createContext(null);

export const StoreProvider = ({ children }) => {
    const rootStore = new RootStore();

    return (
      <StoreContext.Provider value={rootStore}>
          {children}
      </StoreContext.Provider>
    );
};

export const useStore = () => {
    const context = React.useContext(StoreContext);
    if (!context) {
        throw new Error('useStore must be used within a StoreProvider');
    }
    return context;
}
