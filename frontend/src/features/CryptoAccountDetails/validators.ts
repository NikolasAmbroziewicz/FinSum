import { date, object, TypeOf, number, string } from 'zod'

const cryptoCurrencyDetailsSchema = object({
  id: number().optional(),
  name: string().min(1, 'Name is Required'),
  amount: string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: 'Amount is required'
  }),
  price_bought: string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: 'Price Bought is required'
  }),
  date_bought: date({
    required_error: 'Please select a date and time'
  }),
  stock_name: string().optional()
})

export type CryptoCurrencyDetailsSchemaType = TypeOf<typeof cryptoCurrencyDetailsSchema>