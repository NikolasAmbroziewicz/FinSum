import { Injectable, ForbiddenException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../../../prisma/prisma.service';
import { ExternalCryptoApiService } from '../../external_crypto_api/external_crypto_api.service'

import { MathCalculation } from '../../../common/utils/math_calculation'

import { CryptoDetailsDto } from './crypto_details.dto'
import { SummaryCryptoInfo } from './types'

@Injectable()
export class CryptoDetailsService {
  constructor(
    private readonly prisma: PrismaService,
    private externalCryptoApiService: ExternalCryptoApiService,
    private mathCalculation: MathCalculation
  ) {}

  async addCryptoCurrency(
    crypto_currency: CryptoDetailsDto,
    account_id: string
  ) {
    const { name, amount, ticker, price_bought, price_sold, date_bought, date_sold, stock_name } = crypto_currency

    const parsed_account_number = Number(account_id)
    const parsed_bought_date = new Date(date_bought)

    const price_sold_value = price_sold  ? price_sold : null
    const date_sold_value = date_sold ? new Date(date_sold): null
    const stock_name_value = stock_name ? stock_name : ''

    const added_currency = this.prisma.cryptocurrency.create({
      data: {
        name: name,
        amount: amount,
        ticker: ticker,
        price_bought: price_bought,
        price_sold: price_sold_value,
        date_bought: parsed_bought_date,
        date_sold: date_sold_value,
        stock_name: stock_name_value,
        cryptocurrency_wallet: {
          connect: {
            id: parsed_account_number
          }
        }
      }
    })

    return added_currency
  }

  async getCryptoCurrency(
    account_id: string
  ) {
    const parsed_number = Number(account_id)

    const all_currency = this.prisma.cryptocurrency.findMany({
      where: {
        cryptocurrency_wallet: {
          id: parsed_number
        }
      }
    })

    return all_currency
  }

  async deleteCryptoCurrency(
    crypto_currency_id: string
  ) {
    try {
      const parsed_currency_number = Number(crypto_currency_id)

      const deleted_currency = this.prisma.cryptocurrency.delete({
        where: {
          id: parsed_currency_number
        }
      })
  
      return deleted_currency
    } catch (e: any) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new ForbiddenException('Account Does not exist');
        }
      }
    }
  }

  async editCryptoCurrency(
    crypto_currency: CryptoDetailsDto,
    crypto_currency_id: string
  ) {
    try {
      const { name, amount, ticker, price_bought, price_sold, date_bought, date_sold, stock_name } = crypto_currency
    
      const parsed_crypto_currency_id = Number(crypto_currency_id)
  
      const parsed_bought_date = new Date(date_bought)
      const parsed_sold_date = new Date(date_sold)
  
      const edited_currency = this.prisma.cryptocurrency.update({
        data: {
          name: name,
          amount: amount,
          ticker: ticker,
          price_bought: price_bought,
          price_sold: price_sold,
          date_bought: parsed_bought_date,
          date_sold: parsed_sold_date,
          stock_name: stock_name,
        },
        where: {
          id: parsed_crypto_currency_id
        }
      })
  
      return edited_currency
    } catch (e: any) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new ForbiddenException('Account Does not exist');
        }
      }
    }
  }

  async getCryptoCurrencySummary(
    account_id: string
  ) {
    const cryptoCurrencySummary: SummaryCryptoInfo[] = await this.prisma.$queryRawUnsafe(`
      SELECT 
        name, 
        SUM(price_bought * amount) / SUM(amount) as avgPrice,
        SUM(amount) as amount
      FROM cryptocurrency
      WHERE cryptocurrency.cryptocurrency_wallet_id=${account_id}
      GROUP BY name
    `) 

    const coinsListData = await this.externalCryptoApiService.fetchCryptoCurrencyByName('bitcoin,ethereum')

    return cryptoCurrencySummary.map((coin) => ({
      coinName: coin.name,
      amount: Number(coin.amount),
      avgPrice: Number(coin.avgprice),
      currentPrice: coinsListData[coin.name],
      procent: this.mathCalculation.countProcent(coinsListData[coin.name], coin.avgprice)
    }))
  }
}
