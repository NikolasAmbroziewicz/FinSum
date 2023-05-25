import apiBase, { useAuthHeader } from 'src/api/httpCommon';
import { IncomeSchemaType } from '../validators';

export const get_income = async (date: Date) => {
  return apiBase
    .get(`/income/v1/get-income?date=${date}`, {
      headers: {
        ...useAuthHeader()
      }
    })
    .then((res) => res.data);
};

export const add_income = async (data: IncomeSchemaType) => {
  return apiBase
    .post(
      '/income/v1/add-income',
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
};

export const edit_income = async (data: IncomeSchemaType) => {
  return apiBase
    .put(
      `/income/v1/edit-income?id=${data.id}`,
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
};

export const delete_income = async (id: number) => {
  return apiBase
    .delete(`income/v1/delete-income?id=${id}`, {
      headers: {
        ...useAuthHeader()
      }
    })
    .then((res) => res.data);
};
