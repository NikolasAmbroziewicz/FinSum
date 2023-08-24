import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException } from '@nestjs/common';

import { AccountIncomeService } from '../account_income.service';
import { PrismaService } from '../../../../../prisma/prisma.service';

import {
  addedIncome,
  addedIncomeInput,
  mockDate, 
  editIncome,
  editIncomeInput,
} from './mocks';

let service: AccountIncomeService;

// Mocks Function
const createIncomeMock = jest.fn();
const findManyIncomeMock = jest.fn();
const deleteIncomeMock = jest.fn();
const updateIncomeMock = jest.fn();

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      AccountIncomeService,
      {
        provide: PrismaService,
        useValue: {
          $queryRawUnsafe: findManyIncomeMock,
          cash: {
            create: createIncomeMock,
            delete: deleteIncomeMock,
            update: updateIncomeMock,
          },
        },
      },
    ],
  }).compile();

  service = module.get<AccountIncomeService>(AccountIncomeService);
});

describe('AccountIncomeService', () => {
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

describe('AccountIncomeService > methods > addIncome', () => {
  it('Should be defined', () => {
    expect(service.addIncome).toBeDefined();
  });

  it('Should return added income when data is correct', async () => {
    createIncomeMock.mockResolvedValue(addedIncome);

    const serviceMethod = await service.addIncome(addedIncomeInput, '10');

    expect(serviceMethod).toEqual(addedIncome);
  });
});

describe('AccountIncomeService > methods > getIncome', () => {
  it('Should be defined', () => {
    expect(service.getIncomes).toBeDefined();
  });

  it('Should return List of Incomes for specyfic user', async () => {
    findManyIncomeMock.mockResolvedValue([addedIncome, addedIncome]);

    const serviceMethod = await service.getIncomes('10', mockDate);

    expect(serviceMethod).toEqual([addedIncome, addedIncome]);
  });
});

describe('AccountIncomeService > methods > deleteIncome', () => {
  it('Should be defined', () => {
    expect(service.deleteIncome).toBeDefined();
  });

  it('Should remove Income from database and return', async () => {
    deleteIncomeMock.mockResolvedValue(addedIncome);

    const serviceMethod = await service.deleteIncome('10');

    expect(serviceMethod).toEqual(addedIncome);
  });

  it('Should return Error when income does not exist in database', async () => {
    deleteIncomeMock.mockImplementation(
      () => new ForbiddenException('Income does not exist'),
    );
    const serviceMethod = (await service.deleteIncome('10')) as any;

    expect(serviceMethod.message).toEqual('Income does not exist');
  });
});

describe('AccountIncomeService > methods > editIncome', () => {
  it('Should be defined', () => {
    expect(service.editIncome).toBeDefined();
  });

  it('Should edit and return income', async () => {
    updateIncomeMock.mockResolvedValue(editIncome);

    const serviceMethod = await service.editIncome(editIncomeInput, '11');

    expect(serviceMethod).toEqual(editIncome);
  });

  it('Should return Error when income does not exist in database', async () => {
    updateIncomeMock.mockImplementation(
      () => new ForbiddenException('Income does not exist'),
    );
    const serviceMethod = (await service.editIncome(
      editIncomeInput,
      '9',
    )) as any;

    expect(serviceMethod.message).toEqual('Income does not exist');
  });
});
