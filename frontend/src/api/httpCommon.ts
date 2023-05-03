import axios from 'axios';
import { Tokens } from 'src/store/user/userSlice';
import { useLocalStorage } from 'src/shared/hooks/useLocalStorage';

export default axios.create({
  baseURL: import.meta.env.VITE_BACKEND_HOST,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const authHeader = () => {
  const { getFromLocalStorage } = useLocalStorage();
  const tokens: Tokens = getFromLocalStorage('user');
  
  return {
    Authorization: `Bearer ${tokens.accessToken}`,
    'x-refresh-token': tokens.refreshToken
  };
};
