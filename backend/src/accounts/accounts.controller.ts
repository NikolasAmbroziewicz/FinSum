import { 
  Controller,
  Delete,
  Post, 
  Get, 
  Put, 
  Body,
  Query
} from '@nestjs/common';

import { GetCurrentUser } from '../common/decorators/getCurrentUser.decorator';
import { AccountsService } from './accounts.service';

import { AccountsDto } from './accounts.dto';

import { UserWithTokens } from '../auth/auth.type';
import { AccountsResponse } from './accounts.type'

@Controller('accounts')
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  @Post('v1/add-account')
  addAccount(
    @Body() account: AccountsDto,
    @GetCurrentUser() user: UserWithTokens,
  ): Promise<AccountsResponse> {
    return this.accountsService.addAccounts(account, user)
  }

  @Get('v1/get-accounts')
  getAccounts(
    @GetCurrentUser() user: UserWithTokens
  ): Promise<AccountsResponse[]> {
    return this.accountsService.getAccounts(user)
  }

  @Delete('v1/delete-account')
  deleteIncome(@Query('id') id: number): Promise<AccountsResponse> {
    return this.accountsService.deleteAccount(Number(id))
  }

  @Put('v1/edit-account')
  editIncome(@Body() income: AccountsDto, @Query('id') id: number) {
    return this.accountsService.editAccount(income, Number(id))
  }
}
