import { Injectable, ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PrismaService } from '../prisma/prisma.service';
import { TokensService } from '../tokens/tokens.service';

import { SignInDto, SingUpDto } from './auth.dto';
import { Tokens, UserWithTokens, UserResponsePayload } from './auth.type';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private tokensService: TokensService,
    private configService: ConfigService,
  ) {}

  async signUp(data: SignInDto): Promise<UserResponsePayload> {
    try {
      const hash = await this.hashData(data.password);

      const newUser = await this.prisma.user.create({
        data: {
          email: data.email,
          password: hash,
          name: data.name,
          surname: data.surname,
        },
      });

      return {
        user: {
          name: newUser.name,
          surname: newUser.surname,
          email: newUser.email,
        },
        tokens: {
          accessToken: this.tokensService.createAccessToken(
            newUser.id,
            newUser.email,
            this.configService.get<string>('ACCESS_TOKEN_TIME_TO_LIVE'),
          ),
          refreshToken: this.tokensService.createRefreshToken(
            newUser.id,
            newUser.email,
            this.configService.get<string>('REFRESH_TOKEN_TIME_TO_LIVE'),
          ),
        },
      };
    } catch (e: any) {
      if (e.code === 'P2002') {
        throw new ForbiddenException('Email Exist');
      }
    }
  }

  async signIn(data: SingUpDto): Promise<UserResponsePayload> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new ForbiddenException("User doesn't exist");
    }

    const isValidPassword = await this.comparePassword(
      data.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new ForbiddenException('Incorrect Email or Password');
    }

    return {
      user: {
        name: user.name,
        surname: user.surname,
        email: user.email,
      },
      tokens: {
        accessToken: this.tokensService.createAccessToken(
          user.id,
          user.email,
          this.configService.get<string>('ACCESS_TOKEN_TIME_TO_LIVE'),
        ),
        refreshToken: this.tokensService.createRefreshToken(
          user.id,
          user.email,
          this.configService.get<string>('REFRESH_TOKEN_TIME_TO_LIVE'),
        ),
      },
    };
  }

  async refreshTokens(tokens: UserWithTokens): Promise<Tokens> {
    const { accessToken, refreshToken, email, userId } = tokens;

    if (!accessToken || !userId) {
      throw new ForbiddenException('Unauthorized');
    }
    const { valid, expired } = this.tokensService.verifyJWT(accessToken);

    if (valid && !expired) {
      return {
        accessToken,
        refreshToken,
      };
    } else if (!valid && expired) {
      return {
        accessToken: null,
        refreshToken: null,
      };
    } else if (valid && expired) {
      return {
        accessToken: this.tokensService.createAccessToken(
          userId,
          email,
          this.configService.get<string>('ACCESS_TOKEN_TIME_TO_LIVE'),
        ),
        refreshToken,
      };
    }
  }

  private hashData(password: string) {
    return bcrypt.hash(password, 12);
  }

  private comparePassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }
}
