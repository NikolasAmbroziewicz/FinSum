import { Module } from '@nestjs/common';

import { AccountExpenses } from './expense/account_expense.controller';
import { AccountExpenseService } from './expense/account_expense.service';

import { AccountIncome } from './income/account_income.controller';
import { AccountIncomeService } from './income/account_income.service';

@Module({
  controllers: [AccountExpenses, AccountIncome],
  providers: [AccountExpenseService, AccountIncomeService],
})
export class AccountDetailsModule {}
