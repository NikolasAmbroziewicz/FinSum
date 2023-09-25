import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { useCryptoAccountsDetailsApi } from 'src/features/CryptoAccountDetails/api/CryptoAccountDetailsApi'

import { CryptoAccountSummaryState } from './types'
import { CryptoCurrencySummary } from 'src/features/CryptoAccountDetails/validators'
import { RootState } from 'src/store/main'

export const getCryptoCurrencySummary = createAsyncThunk(
  'cryptoAccountDetailsSummarySlice/getCryptoCurrencySummary',
  async (account_id: number) => {
    const { get_crypto_currency_summary } = useCryptoAccountsDetailsApi()

    const res: CryptoCurrencySummary[] = await get_crypto_currency_summary(account_id)

    return res
  }
)

const initialState: CryptoAccountSummaryState = {
  currency: [],
  isLoading: false
}

const cryptoAccountDetailsSummarySlice = createSlice({
  name: 'cryptoAccountDetailsSummary',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCryptoCurrencySummary.fulfilled, (state, action) => {
        state.currency = action.payload
        state.isLoading = false
      })
      .addCase(getCryptoCurrencySummary.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCryptoCurrencySummary.rejected, (state) => {
        state.isLoading = false
      })
  }
})

export const getAllSummaryCryptoCurrency = (state: RootState) => state.cryptoAccountDetailsSummary.currency
export const getLoadingStatus = (state: RootState) => state.cryptoAccountDetailsSummary.isLoading

export default cryptoAccountDetailsSummarySlice.reducer