import { Test, TestingModule } from '@nestjs/testing';
import { AccountExpenseService } from '../account_expense.service';

describe('AccountExpenseService', () => {
  let service: AccountExpenseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountExpenseService],
    }).compile();

    service = module.get<AccountExpenseService>(AccountExpenseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
