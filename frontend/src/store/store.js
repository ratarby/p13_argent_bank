import { configureStore } from '@reduxjs/toolkit';
// import { authSlice } from './authSlice';
import authReducer from './authSlice';

const localStorageToken = localStorage.getItem('token');
const localStorageUserData = JSON.parse(localStorage.getItem('user'));


const initializeState = {
    auth: {
        token: localStorageToken || null,
        user: localStorageUserData || null,
        isAuthenticated: localStorageUserData ? true : false,
    }
    
}

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    preloadedState: initializeState,
});

export default store;
