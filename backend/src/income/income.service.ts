import { Injectable } from '@nestjs/common';
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
    const { id, email } = user;
    const { currency, name, value } = income;

    const addedIncome = await this.prisma.income.create({
      data: {
        currency: currency,
        name: name,
        amount: value,
        user: {
          connect: {
            id: id,
            email: email,
          },
        },
      },
    });

    return {
      ...addedIncome,
    };
  }

  async getIcome(user: UserWithTokens): Promise<IncomeResponse[]> {
    const { id, email } = user;

    const income = await this.prisma.income.findMany({
      where: {
        user: {
          id: id,
          email: email,
        },
      },
    });
    console.log('income', income)
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
          throw 'Not Found';
        }
      }
    }
  }

  async editIncome(income: IcomeDto, id: number): Promise<IncomeResponse> {
    const { value, name, currency } = income;

    const updatedIncome = await this.prisma.income.update({
      data: {
        amount: value,
        name: name,
        currency: currency,
      },
      where: {
        id: id,
      },
    });

    return {
      ...updatedIncome,
    };
  }
}
