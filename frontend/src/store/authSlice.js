import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        isAuthenticated: false,
    },
    reducers: {
        login: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
        },
    },
});

export const authActions  = authSlice.actions;

export default authSlice.reducer;