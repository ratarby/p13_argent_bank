import { createSlice } from '@reduxjs/toolkit';
import { userLogin, userProfile, updateUserProfile } from '../../../utils/requestApi';

const user = localStorage.getItem('user');
const token = localStorage.getItem('token');

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        userLogin: userLogin ? user : null,
        userProfile: userProfile ? token : null,
        updateUserProfile: updateUserProfile ? token : null,
        isLoading: false,
        error:  null,
    },
    reducers: {
        loginUser: (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
            state.error = null;
            
        },
        updateUserProfile: (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        loginError: (state, action) => {
        },
    },
});