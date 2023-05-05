import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getIncome } from 'src/features/income/api/incomeApi'

import { IncomeSchemaType } from 'src/features/income/validators'
import { IncomeState, MainStoreType } from "../types";

export const handleGetIncome = createAsyncThunk(
  'income/getIncome',
  async () => {
    const res: IncomeSchemaType[] = await getIncome()

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
      .addCase(handleGetIncome.fulfilled, (state, action) => {
        state.income = action.payload
        state.isLoading = false
      })
      .addCase(handleGetIncome.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(handleGetIncome.rejected, (state, action) => {
        state.isLoading = false
      })
  }
})

export const getAllIncome = (state: MainStoreType) => state.income.income
export const getLoadingStatus = (state: MainStoreType) => state.income.isLoading

export default incomeSlice.reducer