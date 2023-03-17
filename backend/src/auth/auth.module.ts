import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { AccessTokenStrategy } from 'src/common/strategies/accessToken.strategy';
import { RefreshTokenStrategy } from 'src/common/strategies/refreshToken.strategy';

import { TokensModule } from 'src/tokens/tokens.module'

@Module({
  imports: [TokensModule],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy]
})
export class AuthModule {}
