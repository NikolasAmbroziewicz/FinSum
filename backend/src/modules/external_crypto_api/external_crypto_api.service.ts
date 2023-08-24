import { Injectable } from '@nestjs/common';

import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ExternalCryptoApiService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService
  ) {}

  async fetchDataFromApi() {
    return this.httpService.axiosRef.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/map', {
      headers: {
        'X-CMC_PRO_API_KEY': this.configService.get<string>('API_CRYPTO_KEY')
      }
    })
  }
}
