import { Module } from '@nestjs/common';

import { AccountSummary } from './account_summary.controller'
import { AccountSummaryService } from './account_summary.service'

@Module({
  controllers: [AccountSummary],
  providers: [AccountSummaryService]
})
export class AccountSummaryModule {}