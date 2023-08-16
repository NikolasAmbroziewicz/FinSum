import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { 
  useCryptoAccountsDetailsApi 
} from 'src/features/CryptoAccountDetails/api/CryptoAccountDetailsApi'

import type { RootState } from '../main';
import { CryptoAccountDetailsState } from './types'
import { CryptoCurrencyDetailsSchemaType } from 'src/features/CryptoAccountDetails/validators'

export const addCryptoCurrency = createAsyncThunk(
  'cryptoAccountDetails/addCryptoCurrency',
  async ({data, account_id}: {data: CryptoCurrencyDetailsSchemaType, account_id: number}) => {
    const { add_crypto_currency } = useCryptoAccountsDetailsApi()

    const res: CryptoCurrencyDetailsSchemaType = await add_crypto_currency(account_id, data)

    return res
  }
)

export const getCryptoCurrency = createAsyncThunk(
  'cryptoAccountDetails/getCryptoCurrency',
  async (account_id: number) => {
    const { get_all_crypto_currency } = useCryptoAccountsDetailsApi()

    const res: CryptoCurrencyDetailsSchemaType[] = await get_all_crypto_currency(account_id)

    return res
  }
)

export const deleteCryptoCurrency = createAsyncThunk(
  'cryptoAccountDetails/deleteCryptoCurrency',
  async (crypto_currency_id: number) => {
    const { delete_crypto_currency } = useCryptoAccountsDetailsApi()

    const res: CryptoCurrencyDetailsSchemaType = await delete_crypto_currency(crypto_currency_id)

    return res
  }
)

export const editCryptoCurrency = createAsyncThunk(
  'cryptoAccountDetails/editCryptoCurrency',
  async (data: CryptoCurrencyDetailsSchemaType) => {
    const { edit_crypto_currency } = useCryptoAccountsDetailsApi()

    const res: CryptoCurrencyDetailsSchemaType = await edit_crypto_currency(data)

    return res
  }
)

const initialState: CryptoAccountDetailsState = {
  cryptoCurrency: [],
  isLoading: false
}

const cryptoAccountDetailsSlice = createSlice({
  name: 'cryptoAccountDetails',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCryptoCurrency.fulfilled, (state, action) => {
        state.cryptoCurrency = action.payload
        state.isLoading = false
      })
      .addCase(getCryptoCurrency.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCryptoCurrency.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(addCryptoCurrency.fulfilled, (state, action) => {
        state.cryptoCurrency.push(action.payload)
        state.isLoading = false
      })
      .addCase(addCryptoCurrency.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addCryptoCurrency.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(deleteCryptoCurrency.fulfilled, (state, action) => {
        const newState = state.cryptoCurrency.filter(
          (currency) => currency.id !== action.payload.id
        );

        state.cryptoCurrency = newState;
        state.isLoading = false;
      })
      .addCase(deleteCryptoCurrency.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCryptoCurrency.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(editCryptoCurrency.fulfilled, (state, action) => {
        const findIndex = state.cryptoCurrency.findIndex(
          (currency) => currency.id === action.payload.id
        );

        state.cryptoCurrency[findIndex] = action.payload;
        state.isLoading = false;
      })
      .addCase(editCryptoCurrency.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editCryptoCurrency.rejected, (state) => {
        state.isLoading = false;
      });
  }
})

export const getAllCryptoCurrency = (state: RootState) => state.cryptoAccountDetails.cryptoCurrency
export const getLoadingStatus = (state: RootState) => state.cryptoAccountDetails.isLoading

export default cryptoAccountDetailsSlice.reducer;