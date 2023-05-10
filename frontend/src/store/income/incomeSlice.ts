import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { get_income, add_income } from 'src/features/income/api/incomeApi'

import { IncomeSchemaType, IncomeType } from 'src/features/income/validators'
import { IncomeState, MainStoreType } from "../types";

export const getIncome = createAsyncThunk(
  'income/getIncome',
  async () => {
    const res: IncomeType[] = await get_income()

    return res
  }
)

export const addIncome = createAsyncThunk(
  'income/addIncome',
  async (data: IncomeSchemaType) => {
    const res: IncomeType = await add_income(data)

    return res
  }
)

const initialState: IncomeState = {
  income: [],
  isLoading: false
}

const incomeSlice = createSlice({
  name: 'income',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getIncome.fulfilled, (state, action) => {
        state.income = action.payload
        state.isLoading = false
      })
      .addCase(getIncome.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(getIncome.rejected, (state, action) => {
        state.isLoading = false
      })
      .addCase(addIncome.fulfilled, (state, action) => {
        state.income.push(action.payload)
      })
  }
})

export const getAllIncome = (state: MainStoreType) => state.income.income
export const getLoadingStatus = (state: MainStoreType) => state.income.isLoading

export default incomeSlice.reducer