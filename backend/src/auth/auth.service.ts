import { Injectable, ForbiddenException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config';

import { PrismaService } from '../prisma/prisma.service';
import { TokensService } from '../tokens/tokens.service'

import { SignInDto } from './auth.dto';
import { Tokens } from './auth.type';

import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private tokensService: TokensService,
    private configService: ConfigService
    ) {}

  async signUp (data: SignInDto): Promise<Tokens> {
    try {
      const hash = await this.hashData(data.password)

      const newUser = await this.prisma.user.create({
        data: {
          email: data.email,
          password: hash,
          name: data.name,
          surname: data.surname
        }
      })

      return {
        accessToken: this.tokensService.createAccessToken(newUser.id, newUser.email, this.configService.get<string>('ACCESS_TOKEN_TIME_TO_LIVE')),
        refreshToken: this.tokensService.createRefreshToken(newUser.id, newUser.email, this.configService.get<string>('REFRESH_TOKEN_TIME_TO_LIVE'))
      }
    } catch (e: any) {
      if (e.code === 'P2002') {
        throw new ForbiddenException("Email Exist")
      }
    }
  }

  private hashData(password: string) {
    return bcrypt.hash(password, 12);
  }
}