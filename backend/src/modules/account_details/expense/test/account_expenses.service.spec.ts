import { Test, TestingModule } from '@nestjs/testing';
import { AccountExpensesService } from '../account_expenses.service';

describe('AccountExpensesService', () => {
  let service: AccountExpensesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountExpensesService],
    }).compile();

    service = module.get<AccountExpensesService>(AccountExpensesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
