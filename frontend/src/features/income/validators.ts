import { object, string, TypeOf, date } from 'zod'

export const incomeSchema = object({
  title: string().min(1, 'Name is required'),
  currency: string().min(1, 'Currency is Required'),
  amount: string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Number is required"
  }),
  date: date({
    required_error: "Please select a date and time",
  })
})

export type IncomeSchemaType = TypeOf<typeof incomeSchema>

export interface IncomeType extends IncomeSchemaType {
  id: number
}
