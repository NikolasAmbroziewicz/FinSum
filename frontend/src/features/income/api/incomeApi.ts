import apiBase, { authHeader } from 'src/api/httpCommon'
import { IncomeSchemaType } from '../validators'

export const get_income = async () => {
  return apiBase.get('/income/v1/get-income', {
    headers: {
      ...authHeader()
    }
  }).then((res) => res.data)
}

export const add_income = async (data: IncomeSchemaType) => {
  return apiBase.post('/income/v1/add-income',{
    ...data
  },{
    headers: {
      ...authHeader()
    }
  }).then((res) => res.data)
}
