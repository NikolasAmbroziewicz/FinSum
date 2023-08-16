import { date, object, TypeOf, number, string } from 'zod'

export const cryptoCurrencyDetailsSchema = object({
  id: number().optional(),
  name: string().min(1, 'Name is Required'),
  amount: string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: 'Amount is required'
  }),
  price_bought: string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: 'Price Bought is required'
  }),
  price_sold: string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: 'Price Bought is required'
  }).optional(),
  date_bought: date({
    required_error: 'Please select a date and time'
  }),
  date_sold: date({
    required_error: 'Please select a date and time'
  }).optional(),
  stock_name: string().optional()
})

export type CryptoCurrencyDetailsSchemaType = TypeOf<typeof cryptoCurrencyDetailsSchema>