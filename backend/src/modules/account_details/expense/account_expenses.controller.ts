import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query
} from '@nestjs/common';

import { AccountExpensesService } from './account_expenses.service';

import { AddAccountExpenseDto } from './account_expenses.dto'

@Controller('account-details')
export class AccountExpenses {
  constructor(private accountExpensesService: AccountExpensesService) {}

  @Get('v1/get-expenses')
  getExpense(
    @Query('acount_id') acount_id: string
  ) {
    return this.accountExpensesService.getExpenses(acount_id)
  }

  @Post('v1/add-expense')
  addExpense(
    @Body() expense: AddAccountExpenseDto,
    @Query('acount_id') acount_id: string
  ) {
    return this.accountExpensesService.addExpense(expense, acount_id)
  }

  @Delete('v1/delete-expense')
  deleteExpense(
    @Query('expense_id') expense_id: string
  ) {
    return this.accountExpensesService.deleteExpense(expense_id)
  }

  @Put('v1/edit-expense')
  editExpense(
    @Body() expense: AddAccountExpenseDto,
    @Query('expense_id') expense_id: string
  ) {
    return this.accountExpensesService.editExpense(expense, expense_id)
  }
}
