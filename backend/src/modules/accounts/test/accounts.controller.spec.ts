import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController } from '../accounts.controller';
import { AccountsService } from '../accounts.service';

import { accountResponse, accountEditResponse, userWithToken } from './mocks';

let controller: AccountsController;

//Mock Function
const addAccountsMock = jest.fn();
const getAccountsMock = jest.fn();
const deleteAccountMock = jest.fn();
const editAccountMock = jest.fn();

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    controllers: [AccountsController],
    providers: [AccountsService],
  })
    .overrideProvider(AccountsService)
    .useValue({
      addAccounts: addAccountsMock,
      getAccounts: getAccountsMock,
      deleteAccount: deleteAccountMock,
      editAccount: editAccountMock,
    })
    .compile();

  controller = module.get<AccountsController>(AccountsController);
});

describe('AccountsController', () => {
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

describe('AccountsController > methods > addAccount', () => {
  it('should be defined', () => {
    expect(controller.addAccount).toBeDefined();
  });

  it('Should return added Account', async () => {
    addAccountsMock.mockResolvedValueOnce(accountResponse);

    const controllerMethod = await controller.addAccount(
      accountResponse,
      userWithToken,
    );

    expect(controllerMethod).toEqual(accountResponse);
  });
});

describe('AccountsController > methods > getAccounts', () => {
  it('should be defined', () => {
    expect(controller.getAccounts).toBeDefined();
  });

  it('should return list of accounts', async () => {
    getAccountsMock.mockResolvedValueOnce(accountResponse);

    const controllerMethod = await controller.getAccounts(userWithToken);

    expect(controllerMethod).toEqual(accountResponse);
  });
});

describe('AccountsController > methods > deleteIncome', () => {
  it('should be defined', () => {
    expect(controller.deleteIncome).toBeDefined();
  });

  it('should return deleted account', async () => {
    deleteAccountMock.mockResolvedValueOnce(accountResponse);

    const controllerMethod = await controller.deleteIncome(1);

    expect(controllerMethod).toEqual(accountResponse);
  });
});

describe('AccountsController > methods > editIncome', () => {
  it('should be defined', () => {
    expect(controller.editIncome).toBeDefined();
  });

  it('should return edited account', async () => {
    editAccountMock.mockResolvedValueOnce(accountEditResponse);

    const controllerMethod = await controller.editIncome(accountResponse, 1);

    expect(controllerMethod).toEqual(accountEditResponse);
  });
});
