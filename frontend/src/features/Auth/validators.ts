import { object, string, TypeOf } from 'zod';

export const registerSchema = object({
  name: string().min(1, 'Name is Required'),
  surname: string().min(1, 'Surname is Required'),
  email: string().email('Not Valid Email').min(1, 'Email is Required'),
  password: string().min(6, 'Password too Short - Should be 6 chars minimum'),
  passwordConfirmation: string().min(
    6,
    'Password too Short - Should be 6 chars minimum'
  )
}).refine((data) => data.password === data.passwordConfirmation, {
  message: 'Passwords Do not Match',
  path: ['passwordConfirmation']
});

export type registerSchemaType = TypeOf<typeof registerSchema>;

export const loginSchema = object({
  email: string().email('Not Valid Email').min(1, 'Email is Required'),
  password: string().min(6, 'Password too Short - Should be 6 chars minimum')
});

export type loginSchemaType = TypeOf<typeof loginSchema>;
