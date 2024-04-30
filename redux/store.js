'use client';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import Auth from './slices/auth-slice';

const store = configureStore({
  reducer: combineReducers({
    Auth,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const { dispatch, getState } = store;

export default store;
