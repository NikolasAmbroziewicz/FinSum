import axios from 'axios';
import { useLocalStorage } from 'src/hooks/useLocalStorage';

export default axios.create({
  baseURL: import.meta.env.VITE_BACKEND_HOST,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const authHeader = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { getFromLocalStorage } = useLocalStorage();
  const tokens = getFromLocalStorage('user');

  return {
    Authorization: `Bearer ${tokens.accessToken}`,
    'x-refresh-token': tokens.refreshToken
  };
};
