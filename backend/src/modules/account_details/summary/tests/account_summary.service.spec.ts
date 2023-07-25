import { Test, TestingModule } from '@nestjs/testing';
import { AccountSummaryService } from '../account_summary.service';

describe('SummaryService', () => {
  let service: AccountSummaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountSummaryService],
    }).compile();

    service = module.get<AccountSummaryService>(AccountSummaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
