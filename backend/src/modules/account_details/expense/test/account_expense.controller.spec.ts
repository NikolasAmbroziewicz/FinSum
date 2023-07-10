import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException } from '@nestjs/common';

import { AccountExpenses } from '../account_expense.controller';
import { AccountExpenseService } from '../account_expense.service'

let controller: AccountExpenses;

import { 
  mockExpense,
  mockExpenseInput,
  userWithToken
} from './mocks'

// Functions
const addExpenseMock = jest.fn();
const getExpenseMock = jest.fn();
const deleteExpsenseMock = jest.fn();
const editExpenseMock = jest.fn();

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    controllers: [AccountExpenses],
    providers: [AccountExpenseService],
  })
    .overrideProvider(AccountExpenseService)
    .useValue({
      getExpenses: getExpenseMock,
      addExpense: addExpenseMock,
      deleteExpense: deleteExpsenseMock,
      editExpense: editExpenseMock
    })
    .compile();

  controller = module.get<AccountExpenses>(AccountExpenses);
});

describe('AccountExpenseController', () => {
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

describe('AccountExpenseController > methods > addExpense', () => {
  it('should be defined', () => {
    expect(controller.addExpense).toBeDefined();
  });

  it('should add and return return expense', async () => {
    addExpenseMock.mockReturnValueOnce(mockExpense)

    const controllerMethod = await controller.addExpense(mockExpenseInput, '10')

    expect(controllerMethod).toEqual(mockExpense)
  })
});


describe('AccountExpenseController > methods > getExpenses', () => {
  it('should be defined', () => {
    expect(controller.addExpense).toBeDefined();
  })

  it('should return expenses', async () => {
    getExpenseMock.mockReturnValueOnce([mockExpense, mockExpense])
    
    const controllerMethod = await controller.getExpense('10')

    expect(controllerMethod).toEqual([mockExpense, mockExpense])
  })
})

describe('AccountExpenseController > methods > deleteExpense', () => {
  it('should be defined', () => {
    expect(controller.deleteExpense).toBeDefined();
  })

  it('should delete and return expense', async () => {
    deleteExpsenseMock.mockResolvedValueOnce(mockExpense)

    const controllerMethod = await controller.deleteExpense('6')

    expect(controllerMethod).toEqual(mockExpense)
  })

  it('should not delete expense when expense does not exist', async () => {
    deleteExpsenseMock.mockImplementation(
      () => new ForbiddenException('Income does not exist'),
    );

    const controllerMethod = (await controller.deleteExpense('6')) as any

    expect(controllerMethod.message).toEqual('Income does not exist');
  })
})

describe('AccountExpenseController > methods > editExpense', () => {
  it('should be defined', () => {
    expect(controller.editExpense).toBeDefined();
  })

  it('should edit and return expense', async () => {
    editExpenseMock.mockResolvedValueOnce(mockExpense)

    const controllerMethod = await controller.editExpense(mockExpenseInput,'6')

    expect(controllerMethod).toEqual(mockExpense)
  })

  it('should not edit and return expense', async () => {
    editExpenseMock.mockImplementation(
      () => new ForbiddenException('Income does not exist'),
    );

    const controllerMethod = (await controller.editExpense(mockExpenseInput,'6')) as any

    expect(controllerMethod.message).toEqual('Income does not exist');
  })
})