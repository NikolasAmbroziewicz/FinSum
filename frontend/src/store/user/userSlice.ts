import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useLocalStorage } from 'src/shared/hooks/useLocalStorage';

import { signUp, singIn, refreshToken } from 'src/features/auth/api/authApi';
import {
  loginSchemaType,
  registerSchemaType
} from 'src/features/auth/validators';

export type Tokens = {
  refreshToken?: string;
  accessToken?: string;
};

interface UserStore {
  isAuthenticated: boolean;
  user?: {
    email: string;
    name: string;
    surname: string;
  };
  tokens: Tokens;
}

const initialState: UserStore = {
  isAuthenticated: false,
  user: undefined,
  tokens: {
    refreshToken: undefined,
    accessToken: undefined
  }
};

export const signUpUser = createAsyncThunk(
  'user/register',
  async (data: registerSchemaType) => {
    const { setToLocalStorage } = useLocalStorage();

    const res: UserStore = await signUp(data);
    setToLocalStorage('user', res.tokens);

    return res;
  }
);

export const signInUser = createAsyncThunk(
  'user/login',
  async (data: loginSchemaType) => {
    const { setToLocalStorage } = useLocalStorage();

    const res: UserStore = await singIn(data);
    setToLocalStorage('user', res.tokens);

    return res;
  }
);

export const refreshTokens = createAsyncThunk(
  'user/refreshTokens',
  async () => {
    const { setToLocalStorage } = useLocalStorage();

    const res = await refreshToken();
    
    setToLocalStorage('user', res)

    return {
      tokens: {
        ...res
      }
    };
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    logOut: (state, action) => {
      state.tokens.accessToken = undefined;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.tokens = action.payload.tokens;
        state.user = action.payload.user;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.tokens = action.payload.tokens;
        state.user = action.payload.user;
      })
      .addCase(refreshTokens.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.tokens = action.payload.tokens;
      })
      .addCase(refreshTokens.rejected, (state, action) => {
        state.tokens = {
          accessToken: undefined,
          refreshToken: undefined
        }
      });
  }
});

export const { logOut } = userSlice.actions;

export const selectCurrentTokens = (state: UserStore) => state.tokens;

export const selectCurrentUser = (state: UserStore) => state.user;

export const selectUserAuthenticated = (state: UserStore) =>
  state.isAuthenticated;

export default userSlice.reducer;
