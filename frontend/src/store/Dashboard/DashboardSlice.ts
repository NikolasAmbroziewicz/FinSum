import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import isEmpty from 'lodash/isEmpty'

import { DashboardSlice } from './types'
import { CryptoCurrencySummary } from 'src/features/CryptoAccountDetails/validators'

import { useIncomeApi } from 'src/features/Income/api/incomeApi'
import { useAccountDetailsSummary } from 'src/features/AccountDetails/api/AccountDetailsSummary'
import { useCryptoAccountsDetailsApi } from 'src/features/CryptoAccountDetails/api/CryptoAccountDetailsApi'
import { RootState } from '../main';

export const getAccountsDetails = createAsyncThunk(
  'dashboard/getAccountsDetails',
  async ({account_id, date}: {account_id: number, date: Date}) => {
    const { get_account_summary_by_month } = useAccountDetailsSummary()

    const res: any = await get_account_summary_by_month(account_id, date)

    return res
  } 
)

export const getIncomeDetails = createAsyncThunk(
  'dashbord/getIncomesDetails',
  async (date: Date) => {
    const { get_income_by_months } = useIncomeApi()

    const res: any = await get_income_by_months(date)

    return res
  }
)

export const getCryptoCurrencyDetails = createAsyncThunk(
  'dashboard/getCryptoCurrencyDetails',
  async (account_id: number) => {
    const { get_crypto_currency_summary } = await useCryptoAccountsDetailsApi()

    const res: CryptoCurrencySummary[] = await get_crypto_currency_summary(account_id)

    return res
  }
)

const initialState: DashboardSlice = {
  accountDetails: {
    isLoading: false,
    accountDetails: {}
  },
  income: {
    isLoading: false,
    incomes: {
      available_currency: [],
      details: {}
    }
  },
  cryptoCurrency: {
    isLoading: false,
    cryptoSummary: []
  }
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAccountsDetails.fulfilled, (state, action) => {
      state.accountDetails.accountDetails = action.payload
      state.accountDetails.isLoading = false
    })
    builder.addCase(getAccountsDetails.pending, (state) => {
      state.accountDetails.isLoading = true
    })
    builder.addCase(getAccountsDetails.rejected, (state) => {
      state.accountDetails.isLoading = false
    })
    builder.addCase(getIncomeDetails.fulfilled, (state, action) => {
      console.log('incomes', action.payload)
      state.income.incomes = action.payload
      state.income.isLoading = false
    })  
    builder.addCase(getIncomeDetails.pending, (state) => {
      state.income.isLoading = true
    })
    builder.addCase(getIncomeDetails.rejected, (state) => {
      state.income.isLoading = false
    })
    builder.addCase(getCryptoCurrencyDetails.fulfilled, (state, action) => {
      state.cryptoCurrency.cryptoSummary = action.payload
      state.cryptoCurrency.isLoading = false
    })
    builder.addCase(getCryptoCurrencyDetails.pending, (state) => {
      state.cryptoCurrency.isLoading = true
    })
    builder.addCase(getCryptoCurrencyDetails.rejected, (state) => {
      state.cryptoCurrency.isLoading = false
    })
  }
})

export const getAccountDetailsList = (state: RootState) => state.dashBoard.accountDetails.accountDetails
export const getAccountsDetailsLoading = (state: RootState) => state.dashBoard.accountDetails.isLoading

export const getIncomeDetailsList = (state: RootState) => state.dashBoard.income.incomes
export const getIncomeDetailsLoading = (state: RootState) => state.dashBoard.income.isLoading
export const isIncomeDetailsEmpty = (state: RootState) => isEmpty(state.dashBoard.income.incomes.details)

export const getCryptoCurrencyDetailsList = (state: RootState) => state.dashBoard.cryptoCurrency.cryptoSummary
export const getCryptoCurrencyDetailsLoading = (state: RootState) => state.dashBoard.cryptoCurrency.isLoading

export default dashboardSlice.reducer;