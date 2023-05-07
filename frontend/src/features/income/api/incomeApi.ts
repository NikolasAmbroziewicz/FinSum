import apiBase, { authHeader } from 'src/api/httpCommon'
import { Income } from '../types'

export const getIncome = async () => {
  return apiBase.get('/income/v1/get-income', {
    headers: {
      ...authHeader()
    }
  }).then((res) => res.data)
}

export const addIncome = async (data: Income) => {
  return apiBase.post('/income/v1/add-income',{
    ...data
  }, {
    headers: {
      ...authHeader()
    }
  }).then((res) => res.data)
}
