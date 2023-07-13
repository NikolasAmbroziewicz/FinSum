import { object, string, TypeOf, date, number } from 'zod';

const accountDetailsExpenseSchema = object({
  id: number().optional(),
  title: string().min(1, 'Name is required'),
  descriptioin: string().min(1, 'Description is required'),
  amount: string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: 'Number is required'
  }),
  date: date({
    required_error: 'Please select a date and time'
  })
})

export type AccountDetailsExpenseSchemaType = TypeOf<typeof accountDetailsExpenseSchema>;