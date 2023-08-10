import { useAuthHeader, apiBase } from 'src/api/httpCommon';
import { CryptoAccountSchemaType } from '../validators';

export const useCryptoAccountsApi = () => {
  const authHeader = useAuthHeader()
  
  const add_crypto_account = async (data: CryptoAccountSchemaType) => {
    return apiBase()
      .post(
        '/crypto-accounts/v1/add-crypto-account',
        {
          ...data
        },
        {
          headers: {
            ...authHeader
          }
        }
      )
      .then((res) => res.data)
  }
  
  const delete_crypto_account = async (id: number) => {
    return apiBase()
      .delete(
        `/crypto-accounts/v1/delete-account?id=${id}`, {
          headers: {
            ...authHeader
          }
        }
      )
      .then((res) => res.data)
  }

  const edit_crypto_account = async (data: CryptoAccountSchemaType) => {
    return apiBase()
      .put(
        `/crypto-accounts/v1/edit-account?id=${data.id}`,
        {
          ...data
        },
        {
          headers: {
            ...authHeader
          }
        }
      )
      .then((res) => res.data)
  }

  const get_crypto_accounts = async () => {
    return apiBase()
      .get(
        '/crypto-accounts/v1/get-crypto-accounts', {
          headers: {
            ...authHeader
          }
        }
      )
      .then((res) => res.data);
  }

  return {
    add_crypto_account,
    delete_crypto_account,
    edit_crypto_account,
    get_crypto_accounts
  }
}