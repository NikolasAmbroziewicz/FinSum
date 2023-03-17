import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards
} from '@nestjs/common'

import { AuthService } from './auth.service'

import { PublicRoute } from '../common/decorators/publicRoute.decorators'
import { GetCurrentUser } from './decorators/getCurrentUser.decorator';

import { RefreshTokenGuards } from '../common/guards/refreshToken.guards';

import { SignInDto, SingUpDto } from './auth.dto';
import { Tokens, UserWithTokens } from './auth.type';

@PublicRoute()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('v1/signup')
  signUp (@Body() data: SignInDto): Promise<Tokens> {
    return this.authService.signUp(data)
  }


  @Post('v1/signin')
  signIn (@Body() data: SingUpDto): Promise<Tokens>  {
    return this.authService.signIn(data)
  }


  @Get('v1/refresh_tokens')
  @UseGuards(RefreshTokenGuards)
  refreshTokens (@GetCurrentUser() user: UserWithTokens): Promise<Tokens> {
    return this.authService.refreshTokens(user)
  }
}