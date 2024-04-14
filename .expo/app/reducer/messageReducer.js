import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    errorMessage: '',
    successMessage: '',
    infoMessage: '',
};

const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setMessage(state, action) {
            const { category, message } = action.payload;
            state[category] = message;
        },
    },
});

export const { setMessage } = messageSlice.actions;

export default messageSlice.reducer;