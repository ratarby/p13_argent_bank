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
            const { user, token, password } = action.payload;
            state.user = user;
            state.token = token;
            state.isAuthenticated = true;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify({ ...user, password }));
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
        },
        updateProfile: (state, action) => {
            const { user, token } = action.payload;
            state.isAuthenticated = true;
            state.user = user;
            state.token = token;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
        },
        loadUserFromStorage: (state) => {
            const storedToken = localStorage.getItem('token');
            const storedUser = JSON.parse(localStorage.getItem('user'));
            const storedPassword = JSON.parse(localStorage.getItem('user')).password;
            
            if (storedToken && storedUser) {
                state.user = storedUser;
                state.token = storedToken;
                state.password = storedPassword;
                state.isAuthenticated = true;
            }
        },
    },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
