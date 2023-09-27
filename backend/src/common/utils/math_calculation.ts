import { Injectable } from '@nestjs/common'


@Injectable()
export class MathCalculation {
  countProcent (currentPrice: number, avgPrice: string) {
    return ((currentPrice - Number(avgPrice)) / Number(avgPrice)) * 100
  }
}