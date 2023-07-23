import { object, string, TypeOf, date, number } from 'zod';

export const incomeSchema = object({
  id: number().optional(),
  title: string().min(1, 'Name is required'),
  currency: string().min(1, 'Currency is Required'),
  amount: string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: 'Number is required'
  }),
  date: date({
    required_error: 'Please select a date and time'
  })
});

export type IncomeSchemaType = TypeOf<typeof incomeSchema>;
