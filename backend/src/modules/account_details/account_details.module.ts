import { Module } from '@nestjs/common';

import { AccountExpenses } from './expense/account_expenses.controller'
import { AccountExpensesService } from './expense/account_expenses.service'

@Module({
  controllers: [AccountExpenses],
  providers: [AccountExpensesService]
})
export class AccountDetailsModule {}
