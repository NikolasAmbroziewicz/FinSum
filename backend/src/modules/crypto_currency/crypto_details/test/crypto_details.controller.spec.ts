import { Test, TestingModule } from '@nestjs/testing';
import { CryptoDetailsController } from '../crypto_details.controller';

describe('CryptoDetailsController', () => {
  let controller: CryptoDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CryptoDetailsController],
    }).compile();

    controller = module.get<CryptoDetailsController>(CryptoDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
