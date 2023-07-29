import { Module } from '@nestjs/common';

import { AccountExpenses } from './expense/account_expense.controller';
import { AccountExpenseService } from './expense/account_expense.service';

import { AccountIncome } from './income/account_income.controller';
import { AccountIncomeService } from './income/account_income.service';

import { AccountSummary } from './summary/account_summary.controller';
import { AccountSummaryService } from './summary/account_summary.service';

@Module({
  controllers: [AccountExpenses, AccountIncome, AccountSummary],
  providers: [AccountExpenseService, AccountIncomeService, AccountSummaryService],
})
export class AccountDetailsModule {}
