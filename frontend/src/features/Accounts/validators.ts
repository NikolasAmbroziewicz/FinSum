import { object, string, TypeOf, date, number } from 'zod';

export const accountSchema = object({
  id: number().optional(),
  title: string().min(1, 'Name is required'),
  currency: string().min(1, 'Currency is Required'),
});

export type AccountSchemaType = TypeOf<typeof accountSchema>;
