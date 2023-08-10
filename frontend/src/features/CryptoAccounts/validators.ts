import { number, string, object, TypeOf } from 'zod';

export const cryptoAccountSchema = object({
  id: number().optional(),
  title: string().min(1, 'Title is required')
})

export type CryptoAccountSchemaType = TypeOf<typeof cryptoAccountSchema>;