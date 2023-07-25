import { Test, TestingModule } from '@nestjs/testing';
import { AccountSummary } from '../account_summary.controller';

describe('SummaryController', () => {
  let controller: AccountSummary;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountSummary],
    }).compile();

    controller = module.get<AccountSummary>(AccountSummary);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
