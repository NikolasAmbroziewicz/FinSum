import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ElasticSearchController } from './elastic_search.controller';
import { ElasticSearchService } from './elastic_search.service';

import { ExternalCryptoApiModule } from '../external_crypto_api/external_crypto_api.module'

@Module({
  controllers: [ElasticSearchController],
  providers: [ElasticSearchService],
  imports: [
    ExternalCryptoApiModule,
    ConfigModule
  ]
})
export class ElasticSearchModule {}
