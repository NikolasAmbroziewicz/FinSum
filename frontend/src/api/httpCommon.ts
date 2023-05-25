import axios from 'axios';
import { Tokens } from 'src/store/types';
import { useLocalStorage } from 'src/shared/hooks/useLocalStorage';

export default axios.create({
  baseURL: import.meta.env.VITE_BACKEND_HOST,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const useAuthHeader = () => {
  const { getFromLocalStorage } = useLocalStorage();
  const tokens: Tokens = getFromLocalStorage('user');

  return {
    Authorization: `Bearer ${tokens.accessToken}`,
    'x-refresh-token': tokens.refreshToken
  };
};
