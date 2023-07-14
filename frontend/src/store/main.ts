import { configureStore, combineReducers, PreloadedState } from '@reduxjs/toolkit';

import UserReducer from './User/UserSlice';
import IncomesReducer from './Incomes/IncomesSlice';
import AccountsReducer from './Accounts/AccountsSlice';
import AccountDetailsIncomesReducer from './AccountsDetails/incomes/AccountDetailsIncomes';
import AccountDetailsExpensesReducer from './AccountsDetails/expenses/AccountDetailsExpenses';

const rootReducer = combineReducers({
  auth: UserReducer,
  income: IncomesReducer,
  accounts: AccountsReducer,
  accountDetailsIncomes: AccountDetailsIncomesReducer,
  AccountDetailsExpenses: AccountDetailsExpensesReducer
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
