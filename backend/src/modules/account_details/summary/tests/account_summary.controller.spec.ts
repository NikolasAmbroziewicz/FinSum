import { Test, TestingModule } from '@nestjs/testing';

import { AccountSummary } from '../account_summary.controller';
import { AccountSummaryService } from '../account_summary.service'

import { accountSummaryMock, mockDate } from './mocks'

// Mocks
const getSummaryAccountMock = jest.fn()

let controller: AccountSummary;

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    controllers: [AccountSummary],
    providers: [AccountSummaryService]
  })
    .overrideProvider(AccountSummaryService)
    .useValue({
      getSummaryAccount: getSummaryAccountMock
    })
    .compile();

  controller = module.get<AccountSummary>(AccountSummary);
});

describe('SummaryController', () => {
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

describe('SummaryController > methods > getSummaryAccount', () => {
  it('Should be defined', () => {
    expect(controller.getSummaryAccount).toBeDefined()
  })

  it('Should Return AccountSummary', async () => {
    getSummaryAccountMock.mockResolvedValueOnce(accountSummaryMock)

    const controllerMethod = await controller.getSummaryAccount(mockDate, '12')

    expect(controllerMethod).toEqual(accountSummaryMock)
  })
})
