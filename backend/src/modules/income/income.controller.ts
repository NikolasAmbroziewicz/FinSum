import {
  Controller,
  Delete,
  Post,
  Get,
  Put,
  Body,
  Query,
} from '@nestjs/common';

import { GetCurrentUser } from '../../common/decorators/getCurrentUser.decorator';
import { IncomeService } from './income.service';

import { IcomeDto } from './income.dto';
import { IncomeResponse } from './income.type';
import { UserWithTokens } from '../auth/auth.type';

@Controller('income')
export class IncomeController {
  constructor(private incomeService: IncomeService) {}

  @Post('v1/add-income')
  addIncome(
    @Body() income: IcomeDto,
    @GetCurrentUser() user: UserWithTokens,
  ): Promise<IncomeResponse> {
    return this.incomeService.addIncome(income, user);
  }

  @Get('v1/get-income')
  getIncome(
    @GetCurrentUser() user: UserWithTokens,
    @Query('date') date: Date,
  ): Promise<IncomeResponse[]> {
    return this.incomeService.getIncome(user, date);
  }

  @Delete('v1/delete-income')
  deleteIncome(@Query('id') id: number): Promise<IncomeResponse> {
    return this.incomeService.deleteIncome(Number(id));
  }

  @Put('v1/edit-income')
  editIncome(@Body() income: IcomeDto, @Query('id') id: number) {
    return this.incomeService.editIncome(income, Number(id));
  }

  @Get('v1/get-incomes-by-months')
  getIncomesByMonths(
    @Query('date') date: Date,
    @GetCurrentUser() user: UserWithTokens,
  ) {
    return this.incomeService.getIncomesByMonths(user, date)
  } 
}
