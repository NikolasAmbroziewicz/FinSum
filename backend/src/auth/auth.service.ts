import { Injectable, ForbiddenException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config';

import { PrismaService } from '../prisma/prisma.service';
import { TokensService } from '../tokens/tokens.service'

import { SignInDto, SingUpDto } from './auth.dto';
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

  async signIn (data: SingUpDto): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email
      }
    })

    if (!user) {
      throw new ForbiddenException("User doesn't exist")
    }

    const isValidPassword = await this.comparePassword(data.password, user.password)
    
    if (!isValidPassword) {
      throw new ForbiddenException("Incorrect Email or Password")
    }

    return {
      accessToken: this.tokensService.createAccessToken(user.id, user.email, this.configService.get<string>('ACCESS_TOKEN_TIME_TO_LIVE')),
      refreshToken: this.tokensService.createRefreshToken(user.id, user.email, this.configService.get<string>('REFRESH_TOKEN_TIME_TO_LIVE'))
    }
  }

  private hashData(password: string) {
    return bcrypt.hash(password, 12);
  }

  private comparePassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword)
  }
}