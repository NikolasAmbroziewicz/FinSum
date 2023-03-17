import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards
} from '@nestjs/common'

import { RefreshTokenGuards } from '../common/guards/refreshToken.guards';
import { PublicRoute } from '../common/decorators/publicRoute.decorators'
import { GetCurrentUser } from './decorators/getCurrentUser.decorator';
import { AuthService } from './auth.service'

import { SignInDto, SingUpDto } from './auth.dto';
import { Tokens, UserWithTokens } from './auth.type';

@PublicRoute()
@Controller('Auth')
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