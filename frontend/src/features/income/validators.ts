import { object, string, TypeOf } from 'zod'

export const incomeSchema = object({
  name: string().min(1, 'Name is required'),
  currency: string().min(1, 'Currency is Required'),
  amount: string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Number is required"
  })
})

export type IncomeSchemaType = TypeOf<typeof incomeSchema>
