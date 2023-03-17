import {
  Body,
  Controller,
  Post,
} from '@nestjs/common'

import { PublicRoute } from '../common/decorators/publicRoute.decorators'
import { AuthService } from './auth.service'

import { SignInDto, SingUpDto } from './auth.dto';
import { Tokens } from './auth.type';

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
}