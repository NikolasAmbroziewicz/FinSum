import { Injectable, ForbiddenException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../../../prisma/prisma.service';

import { AddAccountExpenseDto } from './account_expenses.dto'

@Injectable()
export class AccountExpensesService {
  constructor(private prisma: PrismaService) {}

  async getExpenses (
    acount_id: string
  ) {
    const parsedNumber = Number(acount_id)

    const allExpenses = await this.prisma.expense.findMany({
      where: {
        account: {
          id: parsedNumber
        }
      }
    })

    return allExpenses
  }

  async addExpense(
    expense: AddAccountExpenseDto,
    acount_id: string
  ) {
    const { title, date, description, amount } = expense

    const parsedDate = new Date(date);
    const parsedAmount = Number(amount);
    const parsedAccountId = Number(acount_id)

    const addedExpense = await this.prisma.expense.create({
      data: {
        title: title,
        date: parsedDate,
        amount: parsedAmount,
        description: description,
        account: {
          connect: {
            id: parsedAccountId
          }
        }
      }
    })

    return {
      ...addedExpense
    }
  }

  async deleteExpense(
    expense_id: string
  ) {
    try {
      const parsedExpenseId = Number(expense_id)

      const deletedExpense = this.prisma.expense.delete({
        where: {
          id: parsedExpenseId
        }
      })
  
      return {
        ...deletedExpense
      }
    } catch (e: any) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new ForbiddenException('Expense does not exist');
        }
      }
    }
  }

  async editExpense(
    expense: AddAccountExpenseDto,
    expense_id: string
  ) {
    try {
      const { title, date, description, amount } = expense

      const parsedDate = new Date(date);
      const parsedAmount = Number(amount);
      const parsedExpenseId = Number(expense_id)

      const updatedExpense = this.prisma.expense.update({
        data: {
          title: title,
          date: parsedDate,
          amount: parsedAmount,
          description: description,
        },
        where: {
          id: parsedExpenseId
        }
      })

      return {
        ...updatedExpense
      }
    } catch (e: any) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new ForbiddenException('Expense does not exist');
        }
      }
    }
  }
}
