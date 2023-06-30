import { createAsyncThunk, createAction, createSlice } from '@reduxjs/toolkit'

import {
  add_account,
  edit_income,
  delete_account,
  get_accounts
} from 'src/features/Accounts/api/AccountsApi'

import { AccountsState } from './types'
import { AccountSchemaType } from 'src/features/Accounts/validators'

export const getAllAccounts = createAsyncThunk(
  'accounts/getAccounts',
  async () => {
    const res: AccountSchemaType[] = await get_accounts()

    return res
  }
)

export const addAccount = createAsyncThunk(
  'accounts/addAccount',
  async (data: AccountSchemaType) => {
    const res: AccountSchemaType = await add_account(data)

    return res
  }
)

export const deleteAccount = createAsyncThunk(
  'accounts/deleteAccount',
  async (id: number) => {
    const res: AccountSchemaType = await delete_account(id)

    return res
  }
)

export const editAccount = createAsyncThunk(
  'accounts/editAccount',
  async (data: AccountSchemaType) => {
    const res: AccountSchemaType = await edit_income(data)

    return res
  }
)

const initialState: AccountsState = {
  accounts: [],
  isLoading: false
}

const accountsSlice = createSlice({
  name: 'accounts',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllAccounts.fulfilled, (state, action) => {
        state.accounts = action.payload
        state.isLoading = false
      })
      .addCase(getAllAccounts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllAccounts.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(addAccount.fulfilled, (state, action) => {
        state.accounts.push(action.payload)
        state.isLoading  = false
      })
      .addCase(addAccount.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addAccount.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        const newState = state.accounts.filter(
          (account) => account.id !== action.payload.id
        )
        state.accounts = newState
      })
      .addCase(deleteAccount.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteAccount.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(editAccount.fulfilled, (state, action) => {
        const findIndex = state.accounts.findIndex(
          (income) => income.id === action.payload.id
        )

        state.accounts[findIndex] = action.payload
      })
      .addCase(editAccount.pending, (state) => {
        state.isLoading = true
      })
      .addCase(editAccount.rejected, (state) => {
        state.isLoading = false
      })
  }
})

export default accountsSlice.reducer;