import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';

import { AccessTokenGuards } from './common/guards/accessToken.guards';
import { TokensModule } from './modules/tokens/tokens.module';
import { IncomeModule } from './modules/income/income.module';
import { AccountsModule } from './modules/accounts/accounts.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    TokensModule,
    IncomeModule,
    AccountsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuards,
    },
  ],
})
export class AppModule {}
