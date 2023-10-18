import { useAuthHeader, apiBase } from 'src/api/httpCommon';
import { AccountDetailsIncomeSchemaType } from '../validators/AccountDetailsIncomes';

export const useDetailsIncomes = () => {
  const authHeader = useAuthHeader();

  const get_account_incomes = async (account_id: number, date: Date) => {
    return apiBase()
      .get(
        `/account-income/v1/get-incomes/${account_id}?date=${date}`,
        {
          headers: {
            ...authHeader
          }
        }
      )
      .then((res) => res.data);
  };

  const add_account_income = async (
    account_id: number,
    data: AccountDetailsIncomeSchemaType
  ) => {
    return apiBase()
      .post(
        `/account-income/v1/add-income/${account_id}`,
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

  const edit_account_income = async (data: AccountDetailsIncomeSchemaType) => {
    return apiBase()
      .put(
        `/account-income/v1/edit-income/${data.id}`,
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

  const delete_account_income = async (income_id: number) => {
    return apiBase()
      .delete(`/account-income/v1/delete-income/${income_id}`, {
        headers: {
          ...authHeader
        }
      })
      .then((res) => res.data);
  };

  return {
    add_account_income,
    delete_account_income,
    edit_account_income,
    get_account_incomes
  };
};
