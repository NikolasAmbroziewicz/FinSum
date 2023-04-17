import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class IncomeService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService
  ) {}

  async addIncome() {

  }

  async getIcome() {

  }

  async deleteIncome() {

  }

  async editIncome() {
    
  }
}
