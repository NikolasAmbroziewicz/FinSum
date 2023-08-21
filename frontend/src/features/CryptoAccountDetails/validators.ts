import { date, object, TypeOf, number, string } from 'zod'

export const cryptoCurrencyDetailsSchema = object({
  id: number().optional(),
  name: string().min(1, 'Name is Required'),
  symbol: string().min(1, 'Ticker is Required'),
  amount: string()
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: 'Amount is required'
    })
    .refine((val) => parseInt(val, 10) >= 0, {
      message: 'Amount can not be negative'
    }),
  price_bought: string()
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: 'Price Bought is required'
    })
    .refine((val) => parseInt(val, 10) >= 0, {
      message: 'Price Bought can not be negative'
    }),
  price_sold: string().optional()
    .refine((val) => (val && parseInt(val, 10) >= 0), {
      message: 'Price Sold can not be negative'
    }),
  date_bought: date({
    required_error: 'Please select a date and time'
  }),
  date_sold: date({
    required_error: 'Please select a date and time'
  }),
  stock_name: string().optional()
})
.refine((data) => (data.date_bought < data.date_sold), {
  message: "Date Sold cannot be earlier than start date.",
  path: ["date_sold"],
})

export type CryptoCurrencyDetailsSchemaType = TypeOf<typeof cryptoCurrencyDetailsSchema>