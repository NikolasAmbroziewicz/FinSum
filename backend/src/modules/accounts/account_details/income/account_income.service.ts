import { Injectable, ForbiddenException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../../../../prisma/prisma.service';
import { AccountIncomeDto } from './account_income.dto';

@Injectable()
export class AccountIncomeService {
  constructor(private prisma: PrismaService) {}

  async getIncomes(account_id: string, date: Date) {
    const parsedAccountId = Number(account_id);
    const currentMonth = new Date(date).getMonth()
    const currentYear = new Date(date).getFullYear()

    const allIncomes = await this.prisma.$queryRawUnsafe(`
      SELECT *
      FROM cash
      WHERE cash.account_id = ${parsedAccountId} AND
        EXTRACT('MONTH' FROM cash.date) = ${currentMonth + 1} AND
        EXTRACT('YEAR' FROM cash.date) = ${currentYear}
    `)

    return allIncomes;
  }

  async addIncome(income: AccountIncomeDto, account_id: string) {
    const { date, title, amount } = income;

    const parsedDate = new Date(date);
    const parsedAmount = Number(amount);
    const parsedAccountId = Number(account_id);

    const addedIncome = await this.prisma.cash.create({
      data: {
        title: title,
        date: parsedDate,
        amount: parsedAmount,
        account: {
          connect: {
            id: parsedAccountId,
          },
        },
      },
    });

    return {
      ...addedIncome,
    };
  }

  async deleteIncome(income_id: string) {
    try {
      const parsedExpenseId = Number(income_id);

      const deletedIncome = await this.prisma.cash.delete({
        where: {
          id: parsedExpenseId,
        },
      });

      return {
        ...deletedIncome,
      };
    } catch (e: any) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new ForbiddenException('Expense does not exist');
        }
      }
    }
  }

  async editIncome(income: AccountIncomeDto, income_id: string) {
    try {
      const { date, title, amount } = income;

      const parsedDate = new Date(date);
      const parsedAmount = Number(amount);
      const parsedIncomeId = Number(income_id);

      const updatedIncome = await this.prisma.cash.update({
        data: {
          title: title,
          date: parsedDate,
          amount: parsedAmount,
        },
        where: {
          id: parsedIncomeId,
        },
      });

      return {
        ...updatedIncome,
      };
    } catch (e: any) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new ForbiddenException('Expense does not exist');
        }
      }
    }
  }
}
