import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../prisma/prisma.service';

import { DataGrouped } from './types'

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

  async getSummaryByMonth(account_id: string, date: Date) {
    
    const current_year = new Date(date).getFullYear();

    const cash_groupped: DataGrouped[] = await this.prisma.$queryRawUnsafe(`
      SELECT SUM(amount), date_part('month',date) as month
      FROM cash
      WHERE cash.account_id=${account_id} AND date_part('year', date)=${current_year}
      GROUP BY month
      ORDER BY month
    `)

    const expense_grouped: DataGrouped[] = await this.prisma.$queryRawUnsafe(`
      SELECT SUM(amount), date_part('month',date) as month
      FROM expense
      WHERE expense.account_id=${account_id} AND date_part('year', date)=${current_year}
      GROUP BY month
      ORDER BY month
    `)

    return this.formattedSummaryByMonthResponse(cash_groupped, expense_grouped)
  }

  private formattedSummaryByMonthResponse(cash: DataGrouped[], expense: DataGrouped[]) {
    const month_by_year = {}

    cash.forEach((cash) => {
      if(month_by_year[cash.month] === undefined) {
        month_by_year[cash.month] = {
          cash: cash.sum
        }
      } else {
        month_by_year[cash.month] = {
          ...month_by_year[cash.month],
          cash: cash.sum
        }
      }
    })

    expense.forEach((expense) => {
      if(month_by_year[expense.month] === undefined) {
        month_by_year[expense.month] = {
          expense: expense.sum
        }
      } else {
        month_by_year[expense.month] = {
          ...month_by_year[expense.month],
          expense: expense.sum
        }
      }
    })

    return month_by_year
  }
}
