import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

import { ExternalCryptoApiService } from './external_crypto_api.service';

@Module({
  providers: [ExternalCryptoApiService],
  imports: [
    HttpModule,
    ConfigModule
  ],
  exports: [ExternalCryptoApiService]
})
export class ExternalCryptoApiModule {}
