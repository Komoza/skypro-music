import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { tracksApi } from '../services/tracks';
import musicReducer from './redusers/musicReducer';

const rootReducer = combineReducers({
    otherState: musicReducer,
    [tracksApi.reducerPath]: tracksApi.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(tracksApi.middleware),
});
