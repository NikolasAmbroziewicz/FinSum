import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query
} from '@nestjs/common';

import { GetCurrentUser } from '../../../common/decorators/getCurrentUser.decorator';
import { AccountExpenseService } from './account_expense.service';

import { AccountExpenseDto } from './account_expense.dto'
import { UserWithTokens } from '../../auth/auth.type';

@Controller('account-expense')
export class AccountExpenses {
  constructor(private accountExpensesService: AccountExpenseService) {}

  @Get('v1/get-expenses')
  getExpense(
    @GetCurrentUser() user: UserWithTokens,
  ) {
    return this.accountExpensesService.getExpenses(user)
  }

  @Post('v1/add-expense')
  addExpense(
    @Body() expense: AccountExpenseDto,
    @GetCurrentUser() user: UserWithTokens,
  ) {
    return this.accountExpensesService.addExpense(expense, user)
  }

  @Delete('v1/delete-expense')
  deleteExpense(
    @Query('expense_id') expense_id: string
  ) {
    return this.accountExpensesService.deleteExpense(expense_id)
  }

  @Put('v1/edit-expense')
  editExpense(
    @Body() expense: AccountExpenseDto,
    @Query('expense_id') expense_id: string
  ) {
    return this.accountExpensesService.editExpense(expense, expense_id)
  }
}
