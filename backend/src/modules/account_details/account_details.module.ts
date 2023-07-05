import { Module } from '@nestjs/common';

import { AccountExpenses } from './expense/account_expenses.controller'
import { AccountExpensesService } from './expense/account_expenses.service'

import { AccountIncome } from './income/account_income.controller'
import { AccountIncomeService } from './income/account_income.service'

@Module({
  controllers: [AccountExpenses, AccountIncome],
  providers: [AccountExpensesService, AccountIncomeService]
})
export class AccountDetailsModule {}
