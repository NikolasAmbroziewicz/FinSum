import { Injectable, ForbiddenException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

import { IcomeDto } from './Income.dto';

import { IncomeResponse } from './income.type';
import { UserWithTokens } from '../auth/auth.type';

@Injectable()
export class IncomeService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async addIncome(
    income: IcomeDto,
    user: UserWithTokens,
  ): Promise<IncomeResponse> {
    const { email } = user;
    const { currency, title, amount, date } = income;

    const parsedDate = new Date(date)
    const parsedAmount = Number(amount)

    const addedIncome = await this.prisma.income.create({
      data: {
        currency: currency,
        title: title,
        amount: parsedAmount,
        date: parsedDate,
        user: {
          connect: {
            email: email,
          },
        },
      },
    });

    return {
      ...addedIncome,
    };
  }

  async getIncome(user: UserWithTokens): Promise<IncomeResponse[]> {
    const { userId, email } = user;

    const income = await this.prisma.income.findMany({
      where: {
        user: {
          id: userId,
          email: email,
        },
      },
    });

    return income;
  }

  async deleteIncome(id: number): Promise<IncomeResponse> {
    try {
      const deleteIncome = await this.prisma.income.delete({
        where: {
          id: id,
        },
      });

      return {
        ...deleteIncome,
      };
    } catch (e: any) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new ForbiddenException('Income does not exist');
        }
      }
    }
  }

  async editIncome(income: IcomeDto, id: number): Promise<IncomeResponse> {
    try {
      const { amount, title, currency } = income;

      const updatedIncome = await this.prisma.income.update({
        data: {
          amount: amount,
          title: title,
          currency: currency,
        },
        where: {
          id: id,
        },
      });

      return {
        ...updatedIncome,
      };
    } catch (e: any) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new ForbiddenException('Income does not exist');
        }
      }
    }
  }
}
