import { configureStore } from '@reduxjs/toolkit';
import { loginSlice } from '../redux/features/loginSlice/loginSlice';

    const store = configureStore({
    reducer: {
        login: loginSlice.reducer
    },
});

export  {store}
