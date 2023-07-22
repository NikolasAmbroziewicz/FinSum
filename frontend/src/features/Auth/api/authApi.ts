import { useAuthHeader, apiBase } from 'src/api/httpCommon';

import {
  loginSchemaType,
  registerSchemaType
} from 'src/features/Auth/validators';

export const signUp = async (data: registerSchemaType) => {
  return apiBase().post('/auth/v1/signup', { ...data }).then((res) => res.data);
};

export const singIn = async (data: loginSchemaType) => {
  return apiBase().post('/auth/v1/signin', { ...data }).then((res) => res.data);
};

export const refreshToken = async () => {
  return apiBase().get('/auth/v1/refresh_tokens', {
      headers: {
        ...useAuthHeader()
      }
    })
    .then((res) => res.data);
};
