import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config'

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

import { AccessTokenGuards } from './common/guards/accessToken.guards';
import { TokensModule } from './tokens/tokens.module';
import { IncomeModule } from './income/income.module';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}), 
    AuthModule, 
    PrismaModule, 
    TokensModule, 
    IncomeModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuards
    },
  ]
})
export class AppModule {}
