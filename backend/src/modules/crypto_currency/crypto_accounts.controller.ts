import {
  Body,
  Controller,
  Delete,
  Post,
  Get,
  Param,
  Put,
} from '@nestjs/common';

import { CryptoAccountsService }  from './crypto_accounts.service'
import { GetCurrentUser } from '../../common/decorators/getCurrentUser.decorator';

import { CryptoAccountDto } from './crypto_accounts.dto'
import { UserWithTokens } from '../auth/auth.type';

@Controller('crypto-accounts')
export class CryptoAccountsController {
  constructor(private cryptoAccountsService: CryptoAccountsService) {}

  @Post('v1/add-crypto-account')
  addAccount(
    @Body() account: CryptoAccountDto,
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

  @Delete('v1/delete-account/:id')
  deleteAccount(
    @Param('id') id: string,
  ) {
    return this.cryptoAccountsService.deleteAccount(id)
  }

  @Put('v1/edit-account')
  editAccount(
    @Body() account: CryptoAccountDto,
    @Param('id') id: string,
  ) {
    return this.cryptoAccountsService.editAccount(account, id)
  }
}
