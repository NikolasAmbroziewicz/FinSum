import { Module } from '@nestjs/common';

import { CryptoDetailsController } from './crypto_details.controller'
import { CryptoDetailsService } from './crypto_details.service'

@Module({
  controllers: [CryptoDetailsController],
  providers: [CryptoDetailsService]
})
export class CryptoDetailsModule {}
