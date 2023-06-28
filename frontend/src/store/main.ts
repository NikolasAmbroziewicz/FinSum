import { configureStore, combineReducers, PreloadedState } from '@reduxjs/toolkit';

import UserReducer from './User/UserSlice';
import IncomeReducer from './Income/IncomeSlice';
import AccountsReducer from './Accounts/AccountsSlice';

const rootReducer = combineReducers({
  auth: UserReducer,
  income: IncomeReducer,
  accounts: AccountsReducer
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
