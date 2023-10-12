import { useAuthHeader, apiBase } from 'src/api/httpCommon';

export const useAccountDetailsSummary = () => {
  const authHeader = useAuthHeader();

  const get_summary_account = async (account_id: number, date: Date) => {
    return apiBase()
      .get(
        `/account-summary/v1/get-summary/${account_id}?date=${date}`,
        {
          headers: {
            ...authHeader
          }
        }
      )
      .then((res) => res.data);
  };

  const get_account_summary_by_month = async (account_id: number, date: Date) => {
    return apiBase()
      .get(
        `/account-summary/v1/get-summary/${account_id}?date=${date}`,
        {
          headers: {
            ...authHeader
          }
        }
      )
      .then((res) => res.data)
  } 

  return {
    get_account_summary_by_month,
    get_summary_account
  };
};
