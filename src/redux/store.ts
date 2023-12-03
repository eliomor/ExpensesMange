import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';

import userReducer from './slices/userSlice';
import filterReducer from './slices/filterSlice';

const rootReducer = combineReducers({
  user: userReducer,
  filters: filterReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
