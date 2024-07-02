import { createSlice } from '@reduxjs/toolkit';

export const editSlice = createSlice({
    name: 'edit',
    initialState: {
        edit: false,
    },
    reducers: {
        editOpen: (state) => {
            state.edit = true;
        },
    },
});

export const editActions  = editSlice.actions;

export default editSlice.reducer;