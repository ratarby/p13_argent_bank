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
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify( state.user));
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
        updateProfile: (state, action) => {
            const { user, token } = action.payload;
            state.isAuthenticated = true;
            state.user = user;
            state.token = token;
            localStorage.setItem('user', JSON.stringify(user));
        },
        cancelUpdateProfile: (state, action) => {
            const{ user, token } = action.payload;
            state.isAuthenticated = true;
            state.user = user;
            state.token = token;
        }
    },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
