import { Test, TestingModule } from '@nestjs/testing';
import { CryptoAccountsService } from '../crypto_accounts.service';

describe('CryptoAccountsService', () => {
  let service: CryptoAccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptoAccountsService],
    }).compile();

    service = module.get<CryptoAccountsService>(CryptoAccountsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
