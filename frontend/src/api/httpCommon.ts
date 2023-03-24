import axios from 'axios';
import { Tokens } from 'src/store/user/userSlice';

export default axios.create({
  baseURL: import.meta.env.VITE_BACKEND_HOST,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const authHeader = (tokens: Tokens) => {
  return {
    Authorization: `Bearer ${tokens.accessToken}`,
    'x-refresh-token': tokens.refreshToken
  };
};
