import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  useAccountApi
} from 'src/features/Accounts/api/AccountsApi';

import type { RootState } from '../main';
import { AccountsState } from './types';
import { AccountSchemaType } from 'src/features/Accounts/validators';

export const getAccounts = createAsyncThunk(
  'accounts/getAccounts',
  async () => {
    const { get_accounts } = useAccountApi();

    const res: AccountSchemaType[] = await get_accounts();

    return res;
  }
);

export const addAccount = createAsyncThunk(
  'accounts/addAccount',
  async (data: AccountSchemaType) => {
    const { add_account } = useAccountApi();

    const res: AccountSchemaType = await add_account(data);

    return res;
  }
);

export const deleteAccount = createAsyncThunk(
  'accounts/deleteAccount',
  async (id: number) => {
    const { delete_account } = useAccountApi();
    const res: AccountSchemaType = await delete_account(id);

    return res;
  }
);

export const editAccount = createAsyncThunk(
  'accounts/editAccount',
  async (data: AccountSchemaType) => {
    const { edit_income } = useAccountApi();

    const res: AccountSchemaType = await edit_income(data);

    return res;
  }
);

const initialState: AccountsState = {
  accounts: [],
  isLoading: false
};

const accountsSlice = createSlice({
  name: 'accounts',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAccounts.fulfilled, (state, action) => {
        state.accounts = action.payload;
        state.isLoading = false;
      })
      .addCase(getAccounts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAccounts.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addAccount.fulfilled, (state, action) => {
        state.accounts.push(action.payload);
        state.isLoading = false;
      })
      .addCase(addAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAccount.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        const newState = state.accounts.filter(
          (account) => account.id !== action.payload.id
        );
        state.accounts = newState;
        state.isLoading = false;
      })
      .addCase(deleteAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAccount.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(editAccount.fulfilled, (state, action) => {
        const findIndex = state.accounts.findIndex(
          (account) => account.id === action.payload.id
        );

        state.accounts[findIndex] = action.payload;
        state.isLoading = false;
      })
      .addCase(editAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editAccount.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const getAllAccounts = (state: RootState) => state.accounts.accounts;
export const getLoadingStatus = (state: RootState) => state.accounts.isLoading;

export default accountsSlice.reducer;
