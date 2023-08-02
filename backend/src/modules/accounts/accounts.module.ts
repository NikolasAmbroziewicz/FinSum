import { Module } from '@nestjs/common';

import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';

import { AccountSummaryModule } from './account_details/summary/account_summary.module';
import { AccountIncomeModule } from './account_details/income/account_income.module';
import { AccountExpenseModule } from './account_details/expense/account_expense.module';

@Module({
  controllers: [AccountsController],
  providers: [AccountsService],
  imports: [
    AccountSummaryModule,
    AccountIncomeModule,
    AccountExpenseModule
  ]
})
export class AccountsModule {}
