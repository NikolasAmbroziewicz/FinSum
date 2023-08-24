import { Test, TestingModule } from '@nestjs/testing';
import {ForbiddenException } from '@nestjs/common';
import { CryptoAccountsController } from '../crypto_accounts.controller';
import { CryptoAccountsService } from '../crypto_accounts.service'

import { 
  accountResponse, 
  addAccountData, 
  userWithToken, 
  findAllAccountResponse 
} from './mocks'

let controller: CryptoAccountsController;

//Mock Function
const addAccountsMock = jest.fn();
const getAccountsMock = jest.fn();
const deleteAccountMock = jest.fn();
const editAccountMock = jest.fn();

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    controllers: [CryptoAccountsController],
    providers: [CryptoAccountsService]
  })
    .overrideProvider(CryptoAccountsService)
    .useValue({
      addAccount: addAccountsMock,
      getAccounts: getAccountsMock,
      deleteAccount: deleteAccountMock,
      editAccount: editAccountMock
    })
    .compile();

  controller = module.get<CryptoAccountsController>(CryptoAccountsController);
});

describe('CryptoAccountsController', () => {
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

describe('CryptoAccountsController > methods > addAccount', () => {
  it('Should be defined', () => {
    expect(controller.addAccount).toBeDefined()
  })

  it('Should return added Account', async () => {
    addAccountsMock.mockResolvedValueOnce(accountResponse)

    const controllerMethod = await controller.addAccount(addAccountData, userWithToken)

    expect(controllerMethod).toEqual(accountResponse)
  })
})

describe('CryptoAccountsController > methods > getAccounts', () => {
  it('Should be defined', () => {
    expect(controller.getAccounts).toBeDefined()
  })

  it('Should return All Accounts', async () => {
    getAccountsMock.mockResolvedValueOnce(findAllAccountResponse)

    const controllerMethod = await controller.getAccounts(userWithToken)

    expect(controllerMethod).toEqual(findAllAccountResponse)
  })
})

describe('CryptoAccountsController > methods > deleteAccount', () => {
  it('Should be defined', () => {
    expect(controller.deleteAccount).toBeDefined()
  })

  it('Should return Deleted Account', async () => {
    deleteAccountMock.mockResolvedValueOnce(accountResponse)

    const controllerMethod = await controller.deleteAccount('1')

    expect(controllerMethod).toEqual(accountResponse)
  })

  it('Should return error when account does not exist', async () => {
    deleteAccountMock.mockImplementation(
      () => new ForbiddenException('Account does not exist'),
    );

    const controllerMethod = (await controller.deleteAccount('6')) as any;

    expect(controllerMethod.message).toEqual('Account does not exist');
  })
})

describe('CryptoAccountsController > methods > editAccount', () => {
  it('Should be defined', () => {
    expect(controller.editAccount).toBeDefined()
  })

  it('Should return Edited Account', async () => {
    editAccountMock.mockResolvedValueOnce(accountResponse)

    const controllerMethod = await controller.editAccount(accountResponse, '1')

    expect(controllerMethod).toEqual(accountResponse)
  })

  it('Should return error when account does not exist', async () => {
    editAccountMock.mockImplementation(
      () => new ForbiddenException('Account does not exist'),
    );

    const controllerMethod = (await controller.deleteAccount('6')) as any;

    expect(controllerMethod.message).toEqual('Account does not exist');
  })
})

