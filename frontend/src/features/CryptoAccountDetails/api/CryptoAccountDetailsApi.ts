import { useAuthHeader, apiBase } from 'src/api/httpCommon';
import { CryptoCurrencyDetailsSchemaType } from '../validators'

export const useCryptoAccountsDetailsApi = () => {
  const authHeader = useAuthHeader()

  const add_crypto_currency = async (
    account_id: number,
    data: CryptoCurrencyDetailsSchemaType
  ) => {
    return apiBase()
      .post(
        `/crypto-details/v1/add-crypto-currency?account_id=${account_id}`,
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

  const get_all_crypto_currency = async (
    account_id: number
  ) => {
    return apiBase()
      .get(
        `/crypto-details/v1/get-crypto-currency?account_id=${account_id}`,
        {
          headers: {
            ...authHeader
          }
        }
      )
      .then((res) => res.data)

  }

  const delete_crypto_currency = async (
    crypto_currency_id: number
  ) => {
    return apiBase()
      .delete(
        `/crypto-details/v1/delete-crypto-currency?crypto_currency_id=${crypto_currency_id}`,
        {
          headers: {
            ...authHeader
          }
        }
      )
      .then((res) => res.data)
  }

  const edit_crypto_currency = async (
    data:CryptoCurrencyDetailsSchemaType
  ) => {
    return apiBase()
      .put(
        `/crypto-details/v1/edit-crypto-currency?crypto_currency_id=${data.id}`,
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

  const get_all_crypto_options = async (
    search_param: string
  ) => {
    return apiBase()
    .get(
      `/elastic-search/v1/search-crypto-options?q=${search_param}`,
      {
        headers: {
          ...authHeader
        }
      }
    ).then((res) => res.data)
  }

  return {
    add_crypto_currency,
    delete_crypto_currency,
    edit_crypto_currency,
    get_all_crypto_currency,
    get_all_crypto_options
  }
}