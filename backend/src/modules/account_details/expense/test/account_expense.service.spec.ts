import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException } from '@nestjs/common';

import { AccountExpenseService } from '../account_expense.service';
import { PrismaService } from '../../../../prisma/prisma.service';

import { 
  mockExpense,
  mockExpenseInput,
  userWithToken
} from './mocks'

// Functions
const createExpenseMock = jest.fn();
const getExpenseMock = jest.fn();
const deleteExpsenseMock = jest.fn();
const editExpenseMock = jest.fn();

let service: AccountExpenseService;

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [AccountExpenseService,
    {
      provide: PrismaService,
      useValue: {
        expense: {
          findMany: getExpenseMock,
          create: createExpenseMock,
          delete: deleteExpsenseMock,
          update: editExpenseMock
        }
      }
    }
    ],
  }).compile();

  service = module.get<AccountExpenseService>(AccountExpenseService);
});

describe('AccountExpenseService', () => {
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

describe('AccountExpenseService > methods > addExpense', () => {
  it('Should be defined', async () => {
    expect(service.addExpense).toBeDefined()
  })

  it('Should add and return expense', async () => {
    createExpenseMock.mockResolvedValueOnce(mockExpense)

    const serviceMethod = await service.addExpense(mockExpenseInput, userWithToken)

    expect(serviceMethod).toEqual(mockExpense)
  })
})

describe('AccountExpenseService > methods > getExpense', () => {
  it('Should be defined', () => {
    expect(service.getExpenses).toBeDefined()
  })

  it('Should return all expenses', async () => {
    getExpenseMock.mockResolvedValueOnce([mockExpense, mockExpense])

    const serviceMethod = await service.getExpenses(userWithToken)

    expect(serviceMethod).toEqual([mockExpense, mockExpense])
  })
})

describe('AccountExpenseService > methods > deleteExpense', () => {
  it('Should be defined', () => {
    expect(service.deleteExpense).toBeDefined()
  })

  it('Should delete and return expense', async () => {
    deleteExpsenseMock.mockReturnValueOnce(mockExpense)

    const serviceMethod = await service.deleteExpense('6')

    expect(serviceMethod).toEqual(mockExpense)
  })

  it('Should not remove expense and should return error',async () => {
    deleteExpsenseMock.mockImplementation(
      () => new ForbiddenException('Expense does not exist'),
    );

    const serviceMethod = (await service.deleteExpense('6')) as any

    expect(serviceMethod.message).toEqual('Expense does not exist');
  })
})

describe('AccountExpenseService > methods > editExpense', () => {
  it('Should be defined', () => {
    expect(service.deleteExpense).toBeDefined()
  })

  it('Should edit and return expense', async () => {
    editExpenseMock.mockReturnValueOnce(mockExpense)

    const serviceMethod = await service.editExpense(mockExpenseInput, '6')

    expect(serviceMethod).toStrictEqual(mockExpense)
  })

  it('Should not edit expense, and should return error when expense doesn not exist in database', async () => {
    editExpenseMock.mockImplementation(
      () => new ForbiddenException('Expense does not exist'),
    );

    const serviceMethod = (await service.editExpense(mockExpenseInput, '6')) as any

    expect(serviceMethod.message).toEqual('Expense does not exist');
  })
})