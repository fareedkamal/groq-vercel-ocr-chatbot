'use client';
import { clearLocalStorage, getLocalStorageItem } from '@/utils/helpers';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

const Auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload;
    },
    resetAuth: (state) => {
      state.user = null;
      clearLocalStorage();
    },
  },
});

export const { setAuth, resetAuth } = Auth.actions;

export default Auth.reducer;
