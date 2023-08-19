import { configureStore } from '@reduxjs/toolkit';
import musicReducer from './redusers/musicReducer';

const store = configureStore({ reducer: musicReducer });

export default store;
