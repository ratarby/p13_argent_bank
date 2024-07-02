import { configureStore } from '@reduxjs/toolkit';
// import { authSlice } from './authSlice';
import authReducer from './authSlice';

const initializeState = {
    auth: {
        token: null,
        user: null,
        isAuthenticated: false,
    }
    
}

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    preloadedState: initializeState,
});

export default store;
