import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException } from '@nestjs/common'

import { CryptoAccountsService } from '../crypto_accounts.service';
import { PrismaService } from '../../../prisma/prisma.service';

let service: CryptoAccountsService;

import { 
  accountResponse, 
  addAccountData, 
  userWithToken, 
  findAllAccountResponse 
} from './mocks'

//Mock Function
const addAccountsMock = jest.fn();
const getAccountsMock = jest.fn();
const deleteAccountMock = jest.fn();
const editAccountMock = jest.fn();

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      CryptoAccountsService,
      {
        provide: PrismaService,
        useValue: {
          cryptocurrency_wallet: {
            create: addAccountsMock,
            findMany: getAccountsMock,
            delete: deleteAccountMock,
            update: editAccountMock
          }
        }
      }
    ],
  }).compile();

  service = module.get<CryptoAccountsService>(CryptoAccountsService);
});

describe('CryptoAccountsService', () => {
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

describe('CryptoAccountsService > methods > addAccount', () => {
  it('Should be defined', () => {
    expect(service.addAccount).toBeDefined()
  })

  it('Should return added Account', async () => {
    addAccountsMock.mockResolvedValueOnce(accountResponse)

    const serviceMethod = await service.addAccount(addAccountData, userWithToken)

    expect(serviceMethod).toEqual(accountResponse)
  })
})

describe('CryptoAccountsService > methods > getAccounts', () => {
  it('Should be defined', () => {
    expect(service.getAccounts).toBeDefined()
  })

  it('Should return All Accounts', async () => {
    getAccountsMock.mockResolvedValueOnce(findAllAccountResponse)

    const serviceMethod = await service.getAccounts(userWithToken)

    expect(serviceMethod).toEqual(findAllAccountResponse)
  })
})

describe('CryptoAccountsService > methods > deleteAccount', () => {
  it('Should be defined', () => {
    expect(service.deleteAccount).toBeDefined()
  })

  it('Should return Deleted Account', async () => {
    deleteAccountMock.mockResolvedValueOnce(accountResponse)

    const serviceMethod = await service.deleteAccount('1')

    expect(serviceMethod).toEqual(accountResponse)
  })

  it('Should return error when account does not exist', async () => {
    deleteAccountMock.mockImplementation(
      () => new ForbiddenException('Account does not exist'),
    );

    const serviceMethod = (await service.deleteAccount('6')) as any;

    expect(serviceMethod.message).toEqual('Account does not exist');
  })
})

describe('CryptoAccountsService > methods > editAccount', () => {
  it('Should be defined', () => {
    expect(service.editAccount).toBeDefined()
  })

  it('Should return Edited Account', async () => {
    editAccountMock.mockResolvedValueOnce(accountResponse)

    const serviceMethod = await service.editAccount(accountResponse, '1')

    expect(serviceMethod).toEqual(accountResponse)
  })

  it('Should return error when account does not exist', async () => {
    editAccountMock.mockImplementation(
      () => new ForbiddenException('Account does not exist'),
    );

    const serviceMethod = (await service.deleteAccount('6')) as any;

    expect(serviceMethod.message).toEqual('Account does not exist');
  })
})