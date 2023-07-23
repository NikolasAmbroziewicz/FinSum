import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { AccountIncomeService } from './account_income.service';

import { AccountIncomeDto } from './account_income.dto';

@Controller('account-income')
export class AccountIncome {
  constructor(private accountIncomeService: AccountIncomeService) {}

  @Get('v1/get-incomes')
  getIncomes(@Query('account_id') account_id: string) {
    return this.accountIncomeService.getIncomes(account_id);
  }

  @Post('v1/add-income')
  addIncome(
    @Body() income: AccountIncomeDto,
    @Query('account_id') account_id: string,
  ) {
    return this.accountIncomeService.addIncome(income, account_id);
  }

  @Delete('v1/delete-income')
  deleteIncome(@Query('income_id') income_id: string) {
    return this.accountIncomeService.deleteIncome(income_id);
  }

  @Put('v1/edit-income')
  editIncome(
    @Body() income: AccountIncomeDto,
    @Query('income_id') income_id: string,
  ) {
    return this.accountIncomeService.editIncome(income, income_id);
  }
}
