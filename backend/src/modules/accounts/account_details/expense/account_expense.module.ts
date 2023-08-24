import { Module } from '@nestjs/common';

import { AccountExpenses } from './account_expense.controller';
import { AccountExpenseService } from './account_expense.service';

@Module({
  controllers: [AccountExpenses],
  providers: [AccountExpenseService]
})
export class AccountExpenseModule {}