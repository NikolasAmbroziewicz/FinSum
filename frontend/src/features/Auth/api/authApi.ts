import { useAuthHeader, apiBase } from 'src/api/httpCommon';

import {
  loginSchemaType,
  registerSchemaType
} from 'src/features/Auth/validators';

export const sign_up = async (data: registerSchemaType) => {
  return apiBase()
    .post('/auth/v1/signup', { ...data })
    .then((res) => res.data);
};

export const sign_in = async (data: loginSchemaType) => {
  return apiBase()
    .post('/auth/v1/signin', { ...data })
    .then((res) => res.data);
};

export const refresh_token = async () => {
  return apiBase()
    .get('/auth/v1/refresh_tokens', {
      headers: {
        ...useAuthHeader()
      }
    })
    .then((res) => res.data);
}
