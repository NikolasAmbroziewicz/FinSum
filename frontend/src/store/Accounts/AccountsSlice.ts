import { createAsyncThunk, createAction, createSlice } from '@reduxjs/toolkit'

const initialState = {
  accounts: [],
  isLoading: false
}

const accountsSlice = createSlice({
  name: 'accounts',
  initialState: initialState,
  reducers: {},
  extraReducers() {

  }
})

export default accountsSlice.reducer;