import { 
  Controller,
  Delete,
  Post, 
  Get, 
  Put } from '@nestjs/common';

import { PublicRoute } from '../common/decorators/publicRoute.decorators'
import { IncomeService } from './income.service';

@Controller('finance')
export class IncomeController {
  constructor(private financeService: IncomeService) {}

  @Post('v1/add-income')
  addIncome() {
    return this.financeService.addIncome()
  }

  @Get('v1/get-icome')
  getIncome() {
    return this.financeService.getIcome()
  }

  @Delete('v1/delete-icome/:id')
  deleteIncome() {
    return this.financeService.deleteIncome()
  }

  @Put('v1/edit-icome/:id')
  editIncome() {
    return this.financeService.editIncome()
  }
}
