import { useAuthHeader, apiBase } from 'src/api/httpCommon';
import { AccountDetailsExpenseSchemaType } from '../validators/AccountDetailsExpenses'

export const get_account_incomes = async (account_id: number) => {
  return apiBase()
    .get(`/account-expense/v1/get-expenses?account_id=${account_id}`, {
      headers: {
        ...useAuthHeader()
      }
    })
    .then((res) => res.data)
}

export const add_account_income = async (account_id: number, data: AccountDetailsExpenseSchemaType) => {
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

export const edit_account_income = async (income_id: number, data: AccountDetailsExpenseSchemaType) => {
  return apiBase()
    .put(
      `/account-expense/v1/edit-expense?expense_id=${income_id}`,
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

export const delete_account_income = async (income_id: number) => {
  return apiBase().delete(`/account-expense/v1/delete-expense?expense_id=${income_id}`, {
    headers: {
      ...useAuthHeader()
    }
  })
  .then((res) => res.data);
}