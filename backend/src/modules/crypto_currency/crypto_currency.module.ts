import { Module } from '@nestjs/common';
import { CryptoCurrencyController } from './crypto_currency.controller';
import { CryptoCurrencyService } from './crypto_currency.service';

@Module({
  controllers: [CryptoCurrencyController],
  providers: [CryptoCurrencyService]
})
export class CryptoCurrencyModule {}
