import {
  Controller,
  Delete,
  Post,
  Get,
  Put,
  Body,
  Query,
} from '@nestjs/common';

import { GetCurrentUser } from 'src/common/decorators/getCurrentUser.decorator';
import { IncomeService } from './income.service';

import { IcomeDto } from './income.dto';
import { IncomeResponse } from './income.type';
import { UserWithTokens } from '../auth/auth.type';

@Controller('income')
export class IncomeController {
  constructor(private financeService: IncomeService) {}

  @Post('v1/add-income')
  addIncome(
    @Body() income: IcomeDto,
    @GetCurrentUser() user: UserWithTokens,
  ): Promise<IncomeResponse> {
    return this.financeService.addIncome(income, user);
  }

  @Get('v1/get-income')
  getIncome(@GetCurrentUser() user: UserWithTokens): Promise<IncomeResponse[]> {
    return this.financeService.getIcome(user);
  }

  @Delete('v1/delete-income')
  deleteIncome(@Query('id') id: number): Promise<IncomeResponse> {
    return this.financeService.deleteIncome(Number(id));
  }

  @Put('v1/edit-income')
  editIncome(@Body() income: IcomeDto, @Query('id') id: number) {
    return this.financeService.editIncome(income, Number(id));
  }
}
