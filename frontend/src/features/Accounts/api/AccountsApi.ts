import { useAuthHeader, apiBase } from 'src/api/httpCommon';
import { AccountSchemaType } from '../validators'

export const get_accounts = async () => {
  return apiBase()
    .get('/accounts/v1/get-accounts', {
      headers: {
        ...useAuthHeader()
      }
    })
    .then((res) => res.data);
}

export const add_account = async (data: AccountSchemaType) => {
  return apiBase().post(
    '/accounts/v1/add-account', 
    {
      ...data
    },
    {
      headers: {
        ...useAuthHeader()
      }
    })
    .then((res) => res.data)
}

export const edit_income = async (data: AccountSchemaType) => {
  return apiBase()
    .put(
      `/accounts/v1/edit-account?id=${data.id}`,
      {
        ...data
      },
      {
        headers: {
          ...useAuthHeader()
        }
      }
    )
    .then((res) => res.data);
};

export const delete_account = async (id: number) => {
  return apiBase().delete(
    `/accounts/v1/add-account?id=${id}`, 
    {
      headers: {
        ...useAuthHeader()
      }
    })
    .then((res) => res.data);
};
