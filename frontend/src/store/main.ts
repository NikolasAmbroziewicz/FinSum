import { configureStore, combineReducers } from '@reduxjs/toolkit';

import userReducer from './user/userSlice';

import incomeReducer from './income/incomeSlice';

const rootReducer = combineReducers({
  auth: userReducer,
  income: incomeReducer
})

export function setupStore (){
  return configureStore({
    reducer: rootReducer
  })
};

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = ReturnType<typeof setupStore>['dispatch']
export type StoreType = ReturnType<typeof setupStore>
