import { useAuthHeader, apiBase } from 'src/api/httpCommon';
import { AccountSchemaType } from '../validators';

export const useAccountApi = () => {
  const authHeader = useAuthHeader();

  const get_accounts = async () => {
    return apiBase()
      .get('/accounts/v1/get-accounts', {
        headers: {
          ...authHeader
        }
      })
      .then((res) => res.data);
  };

  const add_account = async (data: AccountSchemaType) => {
    return apiBase()
      .post(
        '/accounts/v1/add-account',
        {
          ...data
        },
        {
          headers: {
            ...authHeader
          }
        }
      )
      .then((res) => res.data);
  };

  const edit_income = async (data: AccountSchemaType) => {
    return apiBase()
      .put(
        `/accounts/v1/edit-account?id=${data.id}`,
        {
          ...data
        },
        {
          headers: {
            ...authHeader
          }
        }
      )
      .then((res) => res.data);
  };

  const delete_account = async (id: number) => {
    return apiBase()
      .delete(`/accounts/v1/delete-account?id=${id}`, {
        headers: {
          ...authHeader
        }
      })
      .then((res) => res.data);
  };

  return {
    add_account,
    delete_account,
    edit_income,
    get_accounts
  };
};
