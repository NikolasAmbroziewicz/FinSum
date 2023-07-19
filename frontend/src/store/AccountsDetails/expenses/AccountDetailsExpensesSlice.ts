import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { AccountDetailsExpenseSchemaType } from 'src/features/AccountDetails/validators/AccountDetailsExpenses'
import { AccountExpensesState } from './types'
import type { RootState } from '../../main'

import { 
  get_account_expenses,
  add_account_expense,
  edit_account_expense,
  delete_account_expense
} from 'src/features/AccountDetails/api/AccountDetailsExpenses'

export const addAccountExpense = createAsyncThunk(
  'accountDetaulsExpense/addAccountExpense',
  async ({account_id, data}: {account_id: number, data: AccountDetailsExpenseSchemaType}) => {
    const res: AccountDetailsExpenseSchemaType = await add_account_expense(account_id, data)

    return res
  }
)

export const deleteAccountExpense = createAsyncThunk(
  'accountDetailsExpense/deleteAccountExpense',
  async (expense_id: number) => {
    const res: AccountDetailsExpenseSchemaType = await delete_account_expense(expense_id)

    return res
  }
)

export const editAccountExpense = createAsyncThunk(
  'accountDetailsExpense/editAccountExpense',
  async (data: AccountDetailsExpenseSchemaType) => {
    const res: AccountDetailsExpenseSchemaType = await edit_account_expense(data)

    return res
  }
)

export const getAccountExpenses = createAsyncThunk(
  'accountDetailsExpense/getAccountExpenses',
  async (account_id: number) => {
    const res: AccountDetailsExpenseSchemaType[] = await get_account_expenses(account_id)

    return res
  }
)

const initialState: AccountExpensesState = {
  expenses: [],
  isLoading: false
}

const accountDetailsExpensesSlice = createSlice({
  name: 'accountDetailsExpenses',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAccountExpenses.fulfilled, (state, action) => {
        state.expenses = action.payload
        state.isLoading = false
      })
      .addCase(getAccountExpenses.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAccountExpenses.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(addAccountExpense.fulfilled, (state, action) => {
        state.expenses.push(action.payload)
        state.isLoading = false
      })
      .addCase(addAccountExpense.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addAccountExpense.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(deleteAccountExpense.fulfilled, (state, action) => {
        const newState = state.expenses.filter(
          (expense) => expense.id !== action.payload.id
        )

        state.expenses = newState
        state.isLoading = false
      })
      .addCase(deleteAccountExpense.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteAccountExpense.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(editAccountExpense.fulfilled, (state, action) => {
        const findIndex = state.expenses.findIndex(
          (expense) => expense.id === action.payload.id
        )

        state.expenses[findIndex] = action.payload
        state.isLoading = false
      })
      .addCase(editAccountExpense.pending, (state) => {
        state.isLoading = true
      })
      .addCase(editAccountExpense.rejected, (state) => {
        state.isLoading = false
      })
  }
})

export const getAllExpenses = (state: RootState) => state.AccountDetailsExpenses.expenses
export const getLoadingStatus = (state: RootState) => state.AccountDetailsExpenses.isLoading

export default accountDetailsExpensesSlice.reducer