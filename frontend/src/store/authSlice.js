import { createSlice } from '@reduxjs/toolkit';

// const user = localStorage.getItem('user');
// const token = localStorage.getItem('token');

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token : null,
        isAuthenticated: false,
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
    },
});