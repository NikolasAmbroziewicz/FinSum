import { Test, TestingModule } from '@nestjs/testing';
import { CryptoCurrencyController } from '../crypto_currency.controller';

describe('CryptoCurrencyController', () => {
  let controller: CryptoCurrencyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CryptoCurrencyController],
    }).compile();

    controller = module.get<CryptoCurrencyController>(CryptoCurrencyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
