import { Test, TestingModule } from '@nestjs/testing';
import { AccountExpenses } from '../account_expense.controller';

describe('AccountExpenseController', () => {
  let controller: AccountExpenses;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountExpenses],
    }).compile();

    controller = module.get<AccountExpenses>(AccountExpenses);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
