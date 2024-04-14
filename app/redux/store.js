import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducer/route';

const store = configureStore({
    reducer: rootReducer,
});

export default store;