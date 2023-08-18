import { useAuthHeader, apiBase } from 'src/api/httpCommon';

export const useCryptoSearchApi = () => {
  const authHeader = useAuthHeader()  

  const search_crypto_options = async(
    value: string
  ) => {
    return apiBase()
      .get(
        `/elastic-search/v1/search-crypto-options?q=${value}`,
        {
          headers: {
            ...authHeader
          }
        }
      )
      .then((res) => res.data)
  }
  
  return {
    search_crypto_options
  }
}