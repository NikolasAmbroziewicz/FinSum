import { configureStore, combineReducers, PreloadedState } from '@reduxjs/toolkit';

import userReducer from './User/UserSlice';
import incomeReducer from './Income/IncomeSlice';

const rootReducer = combineReducers({
  auth: userReducer,
  income: incomeReducer
})

export function setupStore (preloadedState?: PreloadedState<RootState>){
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
    }),
  })
};

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = ReturnType<typeof setupStore>['dispatch']
export type StoreType = ReturnType<typeof setupStore>
