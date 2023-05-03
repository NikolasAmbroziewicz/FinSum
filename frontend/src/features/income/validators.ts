import { object, string, TypeOf, number} from 'zod'

export const incomeSchema = object({
  name: string().min(1, 'Name is required'),
  currency: string().min(1, 'Currency is required'),
  amount: string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Number is required"
  })
})

export type incomeSchemaType = TypeOf<typeof incomeSchema>
