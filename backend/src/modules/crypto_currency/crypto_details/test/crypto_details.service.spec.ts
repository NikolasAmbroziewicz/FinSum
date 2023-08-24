import { Test, TestingModule } from '@nestjs/testing';
import { CryptoDetailsService } from '../crypto_details.service';

describe('CryptoDetailsService', () => {
  let service: CryptoDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptoDetailsService],
    }).compile();

    service = module.get<CryptoDetailsService>(CryptoDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
