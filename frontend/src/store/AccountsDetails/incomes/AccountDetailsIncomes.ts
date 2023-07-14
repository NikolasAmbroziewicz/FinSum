import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { AccountDetailsIncomeSchemaType } from 'src/features/AccountDetails/validators/AccountDetailsIncomes'
import { AccountIncomesState } from './types'
import type { RootState } from '../../main'

import { 
  add_account_income,
  delete_account_income,
  edit_account_income,
  get_account_incomes
} from 'src/features/AccountDetails/api/AccountDetailsIncomes'

export const addAccountIncome = createAsyncThunk(
  'accountDetailsIncomes/addIncome',
  async ({account_id, data}: {account_id: number, data: AccountDetailsIncomeSchemaType}) => {
    const res: AccountDetailsIncomeSchemaType = await add_account_income(account_id, data)

    return res
  }
)

export const deleteAccountIncome = createAsyncThunk(
  'accountDetailsIncomes/deleteIncome',
  async (income_id: number) => {
    const res: AccountDetailsIncomeSchemaType = await delete_account_income(income_id)

    return res
  }
)

export const editAccountIncome = createAsyncThunk(
  'accountDetailsIncomes/editIncome',
  async ({income_id, data}: {income_id: number, data: AccountDetailsIncomeSchemaType}) => {
    const res: AccountDetailsIncomeSchemaType = await edit_account_income(income_id ,data)

    return res
  }
)

export const getAccountIncomes = createAsyncThunk(
  'accountDetailsIncomes/getIncomes',
  async (account_id: number) => {
    const res: AccountDetailsIncomeSchemaType[] = await get_account_incomes(account_id)

    return res
  }
)

const initialState: AccountIncomesState = {
  incomes: [],
  isLoading: false
}

const accountDetailsIncomes = createSlice({
  name: 'accountDetailsIncomes',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAccountIncomes.fulfilled, (state, action) => {
        state.incomes = action.payload
        state.isLoading = false
      })
      .addCase(getAccountIncomes.pending, (state) => {
        state.isLoading = true

      })
      .addCase(getAccountIncomes.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(addAccountIncome.fulfilled, (state, action) => {
        state.incomes.push(action.payload)
        state.isLoading = false
      })
      .addCase(addAccountIncome.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addAccountIncome.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(deleteAccountIncome.fulfilled, (state, action) => {
        const newState = state.incomes.filter(
          (income) => income.id !== action.payload.id
        )

        state.incomes = newState
        state.isLoading = false
      })
      .addCase(deleteAccountIncome.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteAccountIncome.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(editAccountIncome.fulfilled, (state, action) => {
        const findIndex = state.incomes.findIndex(
          (income) => income.id === action.payload.id
        )

        state.incomes[findIndex] = action.payload
        state.isLoading = false
      })
      .addCase(editAccountIncome.pending, (state) => {
        state.isLoading = true

      })
      .addCase(editAccountIncome.rejected, (state) => {
        state.isLoading = false
      })
  }
})

export const getAllIncomes = (state: RootState) => state.accountDetailsIncomes.incomes
export const getLoadingStatus = (state: RootState) => state.accountDetailsIncomes.isLoading

export default accountDetailsIncomes.reducer
