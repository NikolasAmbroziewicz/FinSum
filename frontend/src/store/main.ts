import { configureStore } from '@reduxjs/toolkit';

import userReducer from './user/userSlice';

import incomeReducer from './income/incomeSlice';

export const store = configureStore({
  reducer: {
    auth: userReducer,
    income: incomeReducer
  }
});

export type AppDispatch = typeof store.dispatch;
