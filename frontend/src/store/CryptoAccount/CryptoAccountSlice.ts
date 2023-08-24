import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import {
  useCryptoAccountsApi
} from 'src/features/CryptoAccounts/api/CryptoAccountApi'

import type { RootState } from '../main';
import { CryptoAccountsState } from './types'
import { CryptoAccountSchemaType } from 'src/features/CryptoAccounts/validators'

export const getCryptoAccounts = createAsyncThunk(
  'cryptoAccounts/getCryptoAccounts',
  async () => {
    const { get_crypto_accounts } = useCryptoAccountsApi()

    const res: CryptoAccountSchemaType[] = await get_crypto_accounts()

    return res
  }
)

export const addCryptoAccounts = createAsyncThunk(
  'cryptoAccounts/addCryptoAccounts',
  async (data: CryptoAccountSchemaType) => {
    const { add_crypto_account } = useCryptoAccountsApi()

    const res: CryptoAccountSchemaType = await add_crypto_account(data)

    return res
  }
)

export const deleteCryptoAccounts = createAsyncThunk(
  'cryptoAccounts/deleteCryptoAccounts',
  async (id: number) => {
    const { delete_crypto_account } = useCryptoAccountsApi()

    const res: CryptoAccountSchemaType = await delete_crypto_account(id)

    return res
  }
)

export const editCryptoAccounts = createAsyncThunk(
  'cryptoAccounts/editCryptoAccounts',
  async (data: CryptoAccountSchemaType) => {
    const {edit_crypto_account} = useCryptoAccountsApi()

    const res: CryptoAccountSchemaType = await edit_crypto_account(data)

    return res
  }
)

const initialState: CryptoAccountsState = {
  accounts: [],
  isLoading: false
}

const cryptoAccountsSlice = createSlice({
  name: 'cryptoAccounts',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCryptoAccounts.fulfilled, (state, action) => {
        state.accounts = action.payload;
        state.isLoading = false;
      })
      .addCase(getCryptoAccounts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCryptoAccounts.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addCryptoAccounts.fulfilled, (state, action) => {
        state.accounts.push(action.payload)
        state.isLoading = false
      })
      .addCase(addCryptoAccounts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addCryptoAccounts.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(deleteCryptoAccounts.fulfilled, (state, action) => {
        const newState = state.accounts.filter(
          (account) => account.id !== action.payload.id
        );
        state.accounts = newState;
        state.isLoading = false;
      })
      .addCase(deleteCryptoAccounts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteCryptoAccounts.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(editCryptoAccounts.fulfilled, (state, action) => {
        const findIndex = state.accounts.findIndex(
          (account) => account.id === action.payload.id
        );

        state.accounts[findIndex] = action.payload;
        state.isLoading = false;
      })
      .addCase(editCryptoAccounts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editCryptoAccounts.rejected, (state) => {
        state.isLoading = false;
      })
  }
})

export const getAllAccounts = (state: RootState) => state.cryptoAccounts.accounts;
export const getLoadingStatus = (state: RootState) => state.cryptoAccounts.isLoading;

export default cryptoAccountsSlice.reducer