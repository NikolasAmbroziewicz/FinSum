import { useAuthHeader, apiBase } from 'src/api/httpCommon';

export const useAccountDetailsSummary = () => {
  const authHeader = useAuthHeader();

  const get_summary_account = (account_id: number, date: Date) => {
    return apiBase()
      .get(
        `/account-summary/v1/get-summary?account_id=${account_id}&date=${date}`,
        {
          headers: {
            ...authHeader
          }
        }
      )
      .then((res) => res.data);
  };

  return {
    get_summary_account
  };
};
