import {
  Body,
  Controller,
  Delete,
  Post,
  Get,
  Put,
  Query,
  ForbiddenException
} from '@nestjs/common';

import { CryptoAccountsService }  from './crypto_accounts.service'
import { GetCurrentUser } from '../../common/decorators/getCurrentUser.decorator';

import { CyrptoAccountDto } from './crypto_accounts.dto'
import { UserWithTokens } from '../auth/auth.type';

@Controller('crypto-accounts')
export class CryptoAccountsController {
  constructor(private cryptoAccountsService: CryptoAccountsService) {}

  @Post('v1/add-crypto-account')
  addAccount(
    @Body() account: CyrptoAccountDto,
    @GetCurrentUser() user: UserWithTokens,
  ) {
    return this.cryptoAccountsService.addAccount(account, user)
  }

  @Get('v1/get-crypto-accounts')
  getAccounts(
    @GetCurrentUser() user: UserWithTokens,
  ) {
    return this.cryptoAccountsService.getAccounts(user)
  }

  @Delete('v1/delete-account')
  deleteAccount(
    @Query('id') id: string,
  ) {
    return this.cryptoAccountsService.deleteAccount(id)
  }

  @Put('v1/edit-account')
  editAccount(
    @Body() account: CyrptoAccountDto,
    @Query('id') id: string,
  ) {
    return this.cryptoAccountsService.editAccount(account, id)
  }
}
