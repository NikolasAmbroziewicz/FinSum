import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException } from '@nestjs/common';

import { IncomeController } from '../income.controller';
import { IncomeService } from '../income.service';

import {
  userWithToken,
  addedIncomeInput,
  addedIncome,
  editIncome,
  editIncomeInput,
} from './mocks';

let controller: IncomeController;

// Functtions
const addIncomeMock = jest.fn();
const getIncomeMock = jest.fn();
const deleteIncomeMock = jest.fn();
const editIncomeMock = jest.fn();

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    controllers: [IncomeController],
    providers: [IncomeService],
  })
    .overrideProvider(IncomeService)
    .useValue({
      addIncome: addIncomeMock,
      deleteIncome: deleteIncomeMock,
      getIncome: getIncomeMock,
      editIncome: editIncomeMock,
    })
    .compile();

  controller = module.get<IncomeController>(IncomeController);
});

describe('IncomeController', () => {
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

describe('IncomeController > methods > addIncome', () => {
  it('Should be defined', () => {
    expect(controller.addIncome).toBeDefined();
  });

  it('should return income', async () => {
    addIncomeMock.mockResolvedValue(addedIncome);

    const controllerMethod = await controller.addIncome(
      addedIncomeInput,
      userWithToken,
    );

    expect(controllerMethod).toEqual(addedIncome);
  });
});

describe('IncomeController > methods > getIncome', () => {
  it('Should be defined', () => {
    expect(controller.getIncome).toBeDefined();
  });

  it('should return list of income', async () => {
    getIncomeMock.mockResolvedValue([addedIncome, addedIncome]);

    const controllerMethod = await controller.getIncome(userWithToken);

    expect(controllerMethod).toEqual([addedIncome, addedIncome]);
  });
});

describe('IncomeController > methods > deleteIncome', () => {
  it('Should be defined', () => {
    expect(controller.deleteIncome).toBeDefined();
  });

  it('Should return delted income', async () => {
    deleteIncomeMock.mockResolvedValue(addedIncome);

    const controllerMethod = await controller.deleteIncome(10);

    expect(controllerMethod).toEqual(addedIncome);
  });

  it('Should throw error when income does not exist', async () => {
    deleteIncomeMock.mockImplementation(
      () => new ForbiddenException('Income does not exist'),
    );

    const controllerMethod = (await controller.deleteIncome(8)) as any;

    expect(controllerMethod.message).toEqual('Income does not exist');
  });
});

describe('IncomeController > methods > editIncome', () => {
  it('Should be defined', () => {
    expect(controller.editIncome).toBeDefined();
  });

  it('Should return edited income', async () => {
    editIncomeMock.mockResolvedValue(editIncome);

    const controllerMethod = await controller.editIncome(editIncomeInput, 8);

    expect(controllerMethod).toEqual(editIncome);
  });

  it('Should return error when income does not exist', async () => {
    editIncomeMock.mockImplementation(
      () => new ForbiddenException('Income does not exist'),
    );

    const controllerMethod = (await controller.editIncome(
      editIncomeInput,
      8,
    )) as any;

    expect(controllerMethod.message).toEqual('Income does not exist');
  });
});
