import { Module } from '@nestjs/common';

import { AccountIncome } from './account_income.controller';
import { AccountIncomeService } from './account_income.service';

@Module({
  controllers: [AccountIncome],
  providers: [AccountIncomeService]
})
export class AccountIncomeModule {}