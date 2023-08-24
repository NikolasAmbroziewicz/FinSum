import { Injectable, ForbiddenException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { CryptoAccountDto } from './crypto_accounts.dto';

import { UserWithTokens } from '../auth/auth.type';

@Injectable()
export class CryptoAccountsService {
  constructor(private prisma: PrismaService) {}

  async addAccount(
    account: CryptoAccountDto,
    user: UserWithTokens
  ) {
    const { email } = user
    const { title } = account

    const addedAccount = await this.prisma.cryptocurrency_wallet.create({
      data: {
        title: title,
        user: {
          connect: {
            email: email
          }
        }
      },
    })

    return addedAccount
  }

  async getAccounts(
    user: UserWithTokens
  ) {
    const { email } = user

    const allAccounts = await this.prisma.cryptocurrency_wallet.findMany({
      where: {
        user: {
          email: email
        }
      }
    })

    return allAccounts
  }

  async deleteAccount(
    id: string
  ) {
    try {
      const parsedNumber = Number(id)

      const deleteAccount = await this.prisma.cryptocurrency_wallet.delete({
        where: {
          id: parsedNumber
        }
      })

      return deleteAccount
    } catch (e: any) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new ForbiddenException('Account Does not exist');
        }
      }
    }
  }

  async editAccount(
    account: CryptoAccountDto,
    id: string,
  ){
    try {
      const { title } = account
      const parsedNumber = Number(id)
  
      const updatedAccout = await this.prisma.cryptocurrency_wallet.update({
        data: {
          title: title
        },
        where: {
          id: parsedNumber
        }
      })

      return updatedAccout
    } catch (e: any) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new ForbiddenException('Account Does not exist');
        }
      }
    }
  }
}
