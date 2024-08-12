import { createSlice } from '@reduxjs/toolkit';


export const authSlice = createSlice({ // Creating a slice named 'auth'
    name: 'auth', 
    initialState: {
            user: null, 
            token: null, 
            isAuthenticated: false, 
        },
    
    reducers: { // Reducers for the slice actions

        login: (state, action) => { // Reducer function for the 'login' action
            const { user, token } = action.payload; 
            state.user = user; 
            state.token = token; 
            state.isAuthenticated = true; 
            localStorage.setItem('token', token); 
            localStorage.setItem('user', JSON.stringify(state.user)); 
        },
        logout: (state) => { // Reducer function for the 'logout' action
            state.isAuthenticated = false; 
            state.user = null; 
            state.token = null; 
            localStorage.removeItem('token'); 
            localStorage.removeItem('user'); 
        },
        updateProfile: (state, action) => { // Reducer function for the 'updateProfile' action
            const { user, token } = action.payload; 
            state.isAuthenticated = true; 
            state.user = user; 
            state.token = token; 
            localStorage.setItem('user', JSON.stringify(state.user)); 
        },
        cancelUpdateProfile: (state, action) => { // Reducer function for the 'cancelUpdateProfile' action
            const{ user, token } = action.payload; 
            state.isAuthenticated = true; 
            state.user = user; 
            state.token = token;
        }
    },
});

export const authActions = authSlice.actions; // Exporting the actions from the slice

export default authSlice.reducer; // Exporting the reducer from the slice
