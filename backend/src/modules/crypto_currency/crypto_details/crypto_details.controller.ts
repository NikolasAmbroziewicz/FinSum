import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query
} from '@nestjs/common';

import { CryptoDetailsService } from './crypto_details.service'

import { CryptoDetailsDto } from './crypto_details.dto'

@Controller('crypto-details')
export class CryptoDetailsController {
  constructor(private cryptoDetailsService: CryptoDetailsService) {}

  @Post('v1/add-crypto-currency')
  addCryptoCurrency(
    @Body() crypto_currency: CryptoDetailsDto,
    @Query('account_id') account_id: string
  ){
    console.log(account_id)
    return this.cryptoDetailsService.addCryptoCurrency(crypto_currency, account_id)
  }

  @Get('v1/get-crypto-currency')
  getCryptoCurrency(
    @Query('account_id') account_id: string,
  ) {
    return this.cryptoDetailsService.getCryptoCurrency(account_id)
  }

  @Delete('v1/delete-crypto-currency')
  deleteCryptoCurrency(
    @Query('crypto_currency_id') crypto_currency_id: string
  ) {
    return this.cryptoDetailsService.deleteCryptoCurrency(crypto_currency_id)
  }

  @Put('v1/edit-crypto-currency')
  editCryptoCurrency(
    @Body() crypto_currency: CryptoDetailsDto,
    @Query('crypto_currency_id') crypto_currency_id: string
  ) {
    return this.cryptoDetailsService.editCryptoCurrency(crypto_currency, crypto_currency_id)
  }
}
