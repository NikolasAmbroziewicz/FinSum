import { Injectable, ForbiddenException } from '@nestjs/common';
import { Prisma } from '@prisma/client'
import { HttpService } from '@nestjs/axios';

import { PrismaService } from '../../prisma/prisma.service';

import { CryptoCurrencyDto } from './crypto_currency.dto'

@Injectable()
export class CryptoCurrencyService {
  constructor(private prisma: PrismaService) {}

  async addCryptoCurrency(
    crypto_currency: CryptoCurrencyDto,
    account_id: string
  ) {
    const { 
      ticker, 
      name, 
      amount, 
      date_bought, 
      date_sold, 
      price_bought,
      price_sold,
      stock_name
    } = crypto_currency

    const parsedNumber = Number(account_id)
    

    const res = await this.prisma.cryptocurrency.create({
      data: {
        name: name,
        amount: amount,
        ticker: ticker,
        price_bought:price_bought,
        price_sold: price_sold,
        date_bought: date_bought,
        date_sold: date_sold,
        stock_name: stock_name,
        cryptocurrency_wallet: {
          connect: {
            id: parsedNumber
          }
        }
      },
    })

    return res
  }

  async deleteCryptoCurrency(
    crypto_currency_id: string
  ) {
    try {
      const parsedCryproCurrencyId = Number(crypto_currency_id)

      const deleteCryptoCurrency = this.prisma.cryptocurrency.delete({
        where: {
          id: parsedCryproCurrencyId
        }
      })

      return {
        ...deleteCryptoCurrency
      }
    } catch (e: any) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new ForbiddenException('Crypto Currency does not exist');
        }
      }
    }
  }

  async editCryptoCurrency(
    crypto_currency: CryptoCurrencyDto,
    account_id: string
  ) {

  }

  private fetchMapCryptoData() {

  }

  private fetchCryptoPriceData() {
    
  }
}
