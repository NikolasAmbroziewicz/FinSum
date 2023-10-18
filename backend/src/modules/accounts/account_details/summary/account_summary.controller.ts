import {
  Controller,
  Get,
  Param,
  Query
} from '@nestjs/common';

import { AccountSummaryService } from './account_summary.service'

@Controller('account-summary')
export class AccountSummary {
  constructor(private accountSummaryService: AccountSummaryService) {}

  @Get('v1/get-summary/:account_id')
  getSummaryAccount(
    @Query('date') date: Date,
    @Param('account_id') account_id: string
  ) {
    return this.accountSummaryService.getSummaryAccount(account_id, date)
  }

  @Get('v1/get-summary-by-month/:account_id')
  getSummaryByMonth(
    @Query('date') date: Date,
    @Param('account_id') account_id: string
  ) {
    return this.accountSummaryService.getSummaryByMonth(account_id, date)
  }
}
