import { Module } from '@nestjs/common';
import { CryptoAccountsController } from './crypto_accounts.controller';
import { CryptoAccountsService } from './crypto_accounts.service';

import { CryptoDetailsModule } from './crypto_details/crypto_details.module';

@Module({
  controllers: [CryptoAccountsController],
  providers: [CryptoAccountsService],
  imports: [CryptoDetailsModule]
})
export class CryptoAccountsModule {}
