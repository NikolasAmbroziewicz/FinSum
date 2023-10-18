import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { AccountIncomeService } from './account_income.service';

import { AccountIncomeDto } from './account_income.dto';

@Controller('account-income')
export class AccountIncome {
  constructor(private accountIncomeService: AccountIncomeService) {}

  @Get('v1/get-incomes/:account_id')
  getIncomes(
    @Param('account_id') account_id: string,
    @Query('date') date: Date  
  ) {
    return this.accountIncomeService.getIncomes(account_id, date);
  }

  @Post('v1/add-income/:account_id')
  addIncome(
    @Body() income: AccountIncomeDto,
    @Param('account_id') account_id: string,
  ) {
    return this.accountIncomeService.addIncome(income, account_id);
  }

  @Delete('v1/delete-income/:income_id')
  deleteIncome(@Param('income_id') income_id: string) {
    return this.accountIncomeService.deleteIncome(income_id);
  }

  @Put('v1/edit-income/:income_id')
  editIncome(
    @Body() income: AccountIncomeDto,
    @Param('income_id') income_id: string,
  ) {
    return this.accountIncomeService.editIncome(income, income_id);
  }
}
