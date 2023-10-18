import { useAuthHeader, apiBase } from 'src/api/httpCommon';
import { IncomeSchemaType } from 'src/features/Income/validators';

export const useIncomeApi = () => {
  const authHeader = useAuthHeader();

  const add_income = async (data: IncomeSchemaType) => {
    return apiBase()
      .post(
        '/income/v1/add-income',
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

  const edit_income = async (data: IncomeSchemaType) => {
    return apiBase()
      .put(
        `/income/v1/edit-income?id=${data.id}`,
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

  const delete_income = async (id: number) => {
    return apiBase()
      .delete(`income/v1/delete-income?id=${id}`, {
        headers: {
          ...authHeader
        }
      })
      .then((res) => res.data);
  };

  const get_income = async (date: Date) => {
    return apiBase()
      .get(`/income/v1/get-income?date=${date}`, {
        headers: {
          ...authHeader
        }
      })
      .then((res) => res.data);
  };

  const get_income_by_months = async (date: Date) => {
    return apiBase()
      .get(`/income/v1/get-incomes-by-months?date=${date}`, {
        headers: {
          ...authHeader
        }
      })
      .then((res) => res.data)
  }

  return {
    add_income,
    delete_income,
    edit_income,
    get_income_by_months,
    get_income
  };
};
