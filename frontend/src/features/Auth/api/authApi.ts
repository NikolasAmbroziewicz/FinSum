import { useAuthHeader, apiBase } from 'src/api/httpCommon';

import {
  loginSchemaType,
  registerSchemaType
} from 'src/features/Auth/validators';

export const useAuthApi = () => {
  const authHeader = useAuthHeader();

  const signUp = async (data: registerSchemaType) => {
    return apiBase()
      .post('/auth/v1/signup', { ...data })
      .then((res) => res.data);
  };

  const signIn = async (data: loginSchemaType) => {
    return apiBase()
      .post('/auth/v1/signin', { ...data })
      .then((res) => res.data);
  };

  const refreshToken = async () => {
    return apiBase()
      .get('/auth/v1/refresh_tokens', {
        headers: {
          ...authHeader
        }
      })
      .then((res) => res.data);
  };

  return {
    signUp,
    signIn,
    refreshToken
  };
};
