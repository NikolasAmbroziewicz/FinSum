import { useAuthHeader, apiBase } from 'src/api/httpCommon';
import { AccountDetailsExpenseSchemaType } from '../validators/AccountDetailsExpenses'

export const get_account_expenses = async (account_id: number) => {
  return apiBase()
    .get(`/account-expense/v1/get-expenses?account_id=${account_id}`, {
      headers: {
        ...useAuthHeader()
      }
    })
    .then((res) => res.data)
}

export const add_account_expense = async (account_id: number, data: AccountDetailsExpenseSchemaType) => {
  return apiBase()
    .post(`/account-expense/v1/add-expense?account_id=${account_id}`, 
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

export const edit_account_expense = async (data: AccountDetailsExpenseSchemaType) => {
  return apiBase()
    .put(
      `/account-expense/v1/edit-expense?expense_id=${data.id}`,
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
}

export const delete_account_expense = async (expense_id: number) => {
  return apiBase().delete(`/account-expense/v1/delete-expense?expense_id=${expense_id}`, {
    headers: {
      ...useAuthHeader()
    }
  })
  .then((res) => res.data);
}