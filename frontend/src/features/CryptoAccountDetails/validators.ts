import { date, object, TypeOf, number, string, z } from 'zod'

export const cryptoCurrencyDetailsSchema = object({
  id: number().optional(),
  name: string().min(1, 'Name is Required'),
  ticker: string().min(1, 'Ticker is Required'),
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
  price_sold: string()
    .optional(),
  date_bought: date({
    required_error: 'Please select a date and time'
  }),
  date_sold: date().nullable().optional(),
  stock_name: string().optional()
})
.superRefine((data, ctx) => {
  if (data.date_sold === null) {
    return true
  } else if (data.date_sold && (data.date_bought > data.date_sold)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Sell Date Must be before Buy Date',
      path: ['date_sold']
    })
  }
})

export type CryptoCurrencySummary = {
  id: number,
  coinName: string,
  avgPrice: string,
  amount: string,
  currentPrice: string,
  procent: string,
  value: number
}

export type CryptoCurrencyDetailsSchemaType = TypeOf<typeof cryptoCurrencyDetailsSchema>