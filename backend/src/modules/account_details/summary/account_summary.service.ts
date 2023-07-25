import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class AccountSummaryService {
  constructor(private prisma: PrismaService) {}

  async getSummaryAccount(account_id: string, date: Date) {
    const parsedAccountId = Number(account_id)
    const currentMonth = new Date(date).getMonth()
    const currentYear = new Date(date).getFullYear()

    const allIncomes = await this.prisma.$queryRawUnsafe(`
      SELECT SUM(amount)
      FROM cash
      WHERE cash.account_id = ${parsedAccountId} AND
        EXTRACT('MONTH' FROM cash.date) = ${currentMonth + 1} AND
        EXTRACT('YEAR' FROM cash.date) = ${currentYear}
    `)

    const allExpense = await this.prisma.$queryRawUnsafe(`
      SELECT SUM(amount)
      FROM expense
      WHERE expense.account_id = ${parsedAccountId} AND
      EXTRACT('MONTH' FROM expense.date) = ${currentMonth + 1} AND
      EXTRACT('YEAR' FROM expense.date) = ${currentYear}
    `)

    const accountInfo = await this.prisma.account.findMany({
      where: {
        id: parsedAccountId
      }
    })

    return {
      total_income: Number(allIncomes[0].sum),
      total_expense: Number(allExpense[0].sum),
      account: {
        currency: accountInfo[0].currency,
      }
    }
  }
}
