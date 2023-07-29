import {
  Controller,
  Get,
  Query
} from '@nestjs/common';

import { AccountSummaryService } from './account_summary.service'

@Controller('account-summary')
export class AccountSummary {
  constructor(private accountSummaryService: AccountSummaryService) {}

  @Get('v1/get-summary')
  getSummaryAccount(
    @Query('date') date: Date,
    @Query('account_id') account_id: string
  ) {
    return this.accountSummaryService.getSummaryAccount(account_id, date)
  } 
}
