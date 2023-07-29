import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { AccountDetailState, AccountDetails } from './types';
import type { RootState } from '../../main';

import { useAccountDetailsSummary } from 'src/features/AccountDetails/api/AccountDetailsSummary';

export const getAccountSummary = createAsyncThunk(
  'accountSummary/getAccountSummary',
  async ({ account_id, date }: { account_id: number; date: Date }) => {
    const { get_summary_account } = useAccountDetailsSummary();

    const res: AccountDetails = await get_summary_account(account_id, date);

    return res;
  }
);

const initialState: AccountDetailState = {
  details: {
    total_expense: 0,
    total_income: 0,
    account: {
      currency: ''
    }
  },
  isLoading: false
};

const accountDetailsSummarySlice = createSlice({
  name: 'accountDetailsSummary',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAccountSummary.fulfilled, (state, action) => {
        state.details = action.payload;
        state.isLoading = false;
      })
      .addCase(getAccountSummary.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getAccountSummary.pending, (state) => {
        state.isLoading = true;
      });
  }
});

export const getAccountSummaryDetails = (state: RootState) =>
  state.accountDetailsSummary.details;

export default accountDetailsSummarySlice.reducer;
