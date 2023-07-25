import { Test, TestingModule } from '@nestjs/testing';
import { AccountSummaryService } from '../account_summary.service';

import { PrismaService } from '../../../../prisma/prisma.service';

import { accountSummaryMock, mockDate } from './mocks'

let service: AccountSummaryService;

// Mocks Functions
const queryRawUnsafeMock = jest.fn()
const findManyMock = jest.fn()

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [AccountSummaryService,
    {
      provide: PrismaService,
      useValue: {
          $queryRawUnsafe: queryRawUnsafeMock,
          account: {
            findMany: findManyMock
          }
      }
    }
    ],
  }).compile();

  service = module.get<AccountSummaryService>(AccountSummaryService);
});


describe('SummaryService', () => {
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

describe('SummaryService > methods > getSummaryAccount', () => {
  it('should be defined', () => {
    expect(service.getSummaryAccount).toBeDefined()
  })

  it('should return account summary', async () => {
    queryRawUnsafeMock
      .mockResolvedValueOnce([{
        sum: 124
      }])
      .mockResolvedValueOnce([{
        sum: 123
      }])
    
    findManyMock.mockResolvedValueOnce([{
      currency: 'USD'
    }])

    const serviceMethod = await service.getSummaryAccount('12', mockDate)

    expect(serviceMethod).toMatchObject({
      account: {
        currency: "USD"
      }, 
      total_expense: 123, 
      total_income: 124
    })
  })
})
