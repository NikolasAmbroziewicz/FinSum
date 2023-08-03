import { Module } from '@nestjs/common';
import { CryptoAccountsController } from './crypto_accounts.controller';
import { CryptoAccountsService } from './crypto_accounts.service';

@Module({
  controllers: [CryptoAccountsController],
  providers: [CryptoAccountsService]
})
export class CryptoAccountsModule {}
