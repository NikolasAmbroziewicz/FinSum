import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException } from '@nestjs/common';

import { AccountsService } from '../accounts.service';
import { PrismaService } from '../../../prisma/prisma.service';

import {
  addAccountData,
  accountResponse, 
  accountEditResponse,
  userWithToken,
  editAccountData
} from './mocks'

let service: AccountsService;

// Mocks Function
const createAccountMock = jest.fn();
const findManyAccountMock = jest.fn();
const deleteAccountMock = jest.fn();
const updateAccountMock = jest.fn();

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      AccountsService,
      {
        provide: PrismaService,
        useValue: {
          account: {
            create: createAccountMock,
            findMany: findManyAccountMock,
            delete: deleteAccountMock,
            update: updateAccountMock,
          }
        }
      }
    ],
  }).compile();

  service = module.get<AccountsService>(AccountsService);
});

describe('AccountsService', () => {
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

describe('AccountsService > methods > addAccount', () => {
  it('should be defined', () => {
    expect(service.addAccounts).toBeDefined();
  });

  it('Should return added account when data is correct', async () => {
    createAccountMock.mockReturnValueOnce(accountResponse)

    const serviceMethod = await service.addAccounts(
      addAccountData,
      userWithToken
    )
    
    expect(serviceMethod).toEqual(accountResponse)
  })
})

describe('AccountsService > methods > getAccounts', () => {
  it('should be defined', () => {
    expect(service.getAccounts).toBeDefined();
  });

  it('Should return all accounts', async () => {
    findManyAccountMock.mockResolvedValueOnce(accountResponse)

    const serviceMethod = await service.getAccounts(
      userWithToken
    )

    expect(serviceMethod).toEqual(accountResponse)
  })
})

describe('AccountsService > methods > deleteAccount', () => {
  it('should be defined', () => {
    expect(service.deleteAccount).toBeDefined();
  });

  it('Should remove account from database and return ', async () => {
    deleteAccountMock.mockResolvedValueOnce(accountResponse)

    const serviceMethod = await service.deleteAccount(1)

    expect(serviceMethod).toEqual(accountResponse)
  })

  it('Should throw error when account does not exist in database', async () => {
    deleteAccountMock.mockImplementation(
      () => new ForbiddenException('Account Does not exist')
    )

    const serviceMethod = (await service.deleteAccount(1)) as any;

    expect(serviceMethod.message).toEqual('Account Does not exist')
  })
})

describe('AccountsService > methods > editAccount', () => {
  it('should be defined', () => {
    expect(service.editAccount).toBeDefined();
  });

  it('Should edit and return account', async () => {
    updateAccountMock.mockResolvedValue(accountEditResponse)

    const serviceMethod = await service.editAccount(editAccountData, 1)

    expect(serviceMethod).toEqual(accountEditResponse)
  })

  it('Should return Error when account does not exist in database', async () => {
    updateAccountMock.mockImplementation(
      () => new ForbiddenException('Account does not exist')
    )

    const serviceMethod = (await service.editAccount(editAccountData, 1)) as any

    expect(serviceMethod.message).toEqual('Account does not exist')
  })
})