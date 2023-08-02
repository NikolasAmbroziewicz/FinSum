import { Test, TestingModule } from '@nestjs/testing';
import { CryptoCurrencyService } from '../crypto_currency.service';

describe('CryptoCurrencyService', () => {
  let service: CryptoCurrencyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptoCurrencyService],
    }).compile();

    service = module.get<CryptoCurrencyService>(CryptoCurrencyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
