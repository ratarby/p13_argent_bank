import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userLogin as login } from '../utils/requestApi';


export const authLogin = createAsyncThunk('auth/login', async () => {
    const response = await login();
    return response.data;
});

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        isAuthenticated: false,
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(authLogin.fulfilled, (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            state.isAuthenticated = true;
        });
    },
});