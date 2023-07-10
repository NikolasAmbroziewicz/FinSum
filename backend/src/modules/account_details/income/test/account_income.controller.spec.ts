import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException } from '@nestjs/common';

import { AccountIncome } from '../account_income.controller';
import { AccountIncomeService } from '../account_income.service'


import {
  userWithToken,
  addedIncomeInput,
  addedIncome,
  editIncome,
  editIncomeInput
} from './mocks';

let controller: AccountIncome;

// Functions
const addIncomeMock = jest.fn();
const getIncomesMock = jest.fn();
const deleteIncomeMock = jest.fn();
const editIncomeMock = jest.fn();

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    controllers: [AccountIncome],
    providers: [AccountIncomeService],
  })
    .overrideProvider(AccountIncomeService)
    .useValue({
      getIncomes: getIncomesMock,
      addIncome: addIncomeMock,
      deleteIncome: deleteIncomeMock,
      editIncome: editIncomeMock
    })
    .compile();

  controller = module.get<AccountIncome>(AccountIncome);
});

describe('AccountIncomeController', () => {
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

describe('AccountIncomeController > methods > addIncome', () => {
  it('Should be defined', () => {
    expect(controller.addIncome).toBeDefined();
  });

  it('should return income', async () => {
    addIncomeMock.mockResolvedValue(addedIncome);

    const controllerMethod = await controller.addIncome(
      addedIncomeInput,
      '10',
    );

    expect(controllerMethod).toEqual(addedIncome);
  });
})

describe('AccountIncomeController > methods > getIncomes', () => {
  it('Should be defined', () => {
    expect(controller.getIncomes).toBeDefined();
  });

  it('should return list of income', async () => {
    getIncomesMock.mockResolvedValue([addedIncome, addedIncome]);

    const controllerMethod = await controller.getIncomes('10');

    expect(controllerMethod).toEqual([addedIncome, addedIncome]);
  });
})

describe('AccountIncomeController > methods > deleteIncome', () => {
  it('Should be defined', () => {
    expect(controller.deleteIncome).toBeDefined();
  });

  it('Should return delted income', async () => {
    deleteIncomeMock.mockResolvedValue(addedIncome);

    const controllerMethod = await controller.deleteIncome('10');

    expect(controllerMethod).toEqual(addedIncome);
  });

  it('Should throw error when income does not exist', async () => {
    deleteIncomeMock.mockImplementation(
      () => new ForbiddenException('Income does not exist'),
    );

    const controllerMethod = (await controller.deleteIncome('8')) as any;

    expect(controllerMethod.message).toEqual('Income does not exist');
  });
})

describe('AccountIncomeController > methods > editIncome', () => {

  it('Should be defined', () => {
    expect(controller.editIncome).toBeDefined();
  });

  it('Should return edited income', async () => {
    editIncomeMock.mockResolvedValue(editIncome);

    const controllerMethod = await controller.editIncome(editIncomeInput, '8');

    expect(controllerMethod).toEqual(editIncome);
  });

  it('Should return error when income does not exist', async () => {
    editIncomeMock.mockImplementation(
      () => new ForbiddenException('Income does not exist'),
    );

    const controllerMethod = (await controller.editIncome(
      editIncomeInput,
      '8',
    )) as any;

    expect(controllerMethod.message).toEqual('Income does not exist');
  });
})