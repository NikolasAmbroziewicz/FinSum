import { Module } from '@nestjs/common';

import { CryptoDetailsController } from './crypto_details.controller'
import { CryptoDetailsService } from './crypto_details.service'

import { ExternalCryptoApiModule } from '../../external_crypto_api/external_crypto_api.module'
import { MathCalculation } from '../../../common/utils/math_calculation'

@Module({
  controllers: [CryptoDetailsController],
  providers: [CryptoDetailsService, MathCalculation],
  imports: [
    ExternalCryptoApiModule,
  ]
})
export class CryptoDetailsModule {}
