import { useAuthHeader, apiBase } from 'src/api/httpCommon';
import { AccountDetailsExpenseSchemaType } from '../validators/AccountDetailsExpenses';

export const useDetailsExpenses = () => {
  const authHeader = useAuthHeader();

  const add_account_expense = async (
    account_id: number,
    data: AccountDetailsExpenseSchemaType
  ) => {
    return apiBase()
      .post(
        `/account-expense/v1/add-expense/${account_id}`,
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

  const edit_account_expense = async (
    data: AccountDetailsExpenseSchemaType
  ) => {
    return apiBase()
      .put(
        `/account-expense/v1/edit-expense/${data.id}`,
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

  const delete_account_expense = async (expense_id: number) => {
    return apiBase()
      .delete(`/account-expense/v1/delete-expense/${expense_id}`, {
        headers: {
          ...authHeader
        }
      })
      .then((res) => res.data);
  };

  const get_account_expenses = async (account_id: number, date: Date) => {
    return apiBase()
      .get(
        `/account-expense/v1/get-expenses/${account_id}?date=${date}`,
        {
          headers: {
            ...authHeader
          }
        }
      )
      .then((res) => res.data);
  };

  return {
    add_account_expense,
    edit_account_expense,
    delete_account_expense,
    get_account_expenses
  };
};
