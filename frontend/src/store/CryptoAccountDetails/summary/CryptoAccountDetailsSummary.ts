import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { CryptoAccountSummaryState } from './types'

const initialState: CryptoAccountSummaryState = {
  currency: [],
  isLoading: false
}

const cryptoAccountDetailsSummarySlice = createSlice({
  name: 'cryptoAccountDetailsSummary',
  initialState: initialState,
  reducers: {},
})

export default cryptoAccountDetailsSummarySlice.reducer