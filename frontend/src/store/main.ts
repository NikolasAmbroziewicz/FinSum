import {
  configureStore,
  combineReducers,
  PreloadedState
} from '@reduxjs/toolkit';

import UserReducer from './User/userSlice';

import IncomesReducer from './Incomes/IncomesSlice';

import AccountsReducer from './Accounts/AccountsSlice';

import AccountDetailsIncomesReducer from './AccountsDetails/incomes/AccountDetailsIncomesSlice';
import AccountDetailsExpensesReducer from './AccountsDetails/expenses/AccountDetailsExpensesSlice';
import AccountDetailsSummaryReducer from './AccountsDetails/summary/AccountDetailsSummarySlice';

import CryptoAccountReducer from './CryptoAccount/CryptoAccountSlice';

import CryptoAccountDetails from './CryptoAccountDetails/CryptoAccountDetailsSlice';
import CryptoAccountDetailsSummary from './CryptoAccountDetails/summary/CryptoAccountDetailsSummarySlice';

import DashboardSliceReducer from './Dashboard/DashboardSlice';

const rootReducer = combineReducers({
  auth: UserReducer,
  income: IncomesReducer,
  accounts: AccountsReducer,
  accountDetailsIncomes: AccountDetailsIncomesReducer,
  accountDetailsExpenses: AccountDetailsExpensesReducer,
  accountDetailsSummary: AccountDetailsSummaryReducer,
  cryptoAccounts: CryptoAccountReducer,
  cryptoAccountDetails:CryptoAccountDetails,
  cryptoAccountDetailsSummary: CryptoAccountDetailsSummary,
  dashBoard: DashboardSliceReducer
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false
      })
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ReturnType<typeof setupStore>['dispatch'];
export type StoreType = ReturnType<typeof setupStore>;
