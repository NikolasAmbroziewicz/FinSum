import { Decimal } from '@prisma/client/runtime';

export type IncomeResponse = {
  id: number;
  title: string;
  amount: Decimal;
  currency: string;
  date: Date;
  user_id: number;
};

export type IncomesByMonth = {
  sum: string,
  currency: string,
  month: number
}

export type AvailableCurrency = {
  currency: string
}
