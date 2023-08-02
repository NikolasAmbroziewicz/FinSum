import { 
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put, 
  Query
} from '@nestjs/common';

import { CryptoCurrencyService } from './crypto_currency.service'

import { CryptoCurrencyDto } from './crypto_currency.dto'

@Controller('crypto-currency')
export class CryptoCurrencyController {
  constructor(private cryptoCurrencyService: CryptoCurrencyService) {}

  @Post('v1/add-crypto-currency')
  addCryptoCurrency(
    @Body() cryptoCurrency: CryptoCurrencyDto,
    @Query('account_id') account_id: string,
  ) {
    return this.cryptoCurrencyService.addCryptoCurrency(cryptoCurrency, account_id, )
  }
}
