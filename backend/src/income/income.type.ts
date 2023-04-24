import { Decimal } from '@prisma/client/runtime';

export type IncomeResponse = {
  id: number;
  name: string;
  amount: Decimal;
  currency: string;
  date: Date;
  user_id: number;
};
