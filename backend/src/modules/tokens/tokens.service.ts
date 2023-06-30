import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { sign, verify } from 'jsonwebtoken';

import { tokenValidationType } from './types';

@Injectable()
export class TokensService {
  constructor(private configService: ConfigService) {}

  signJWT(
    payload: number | string | object | Buffer,
    expiresIn?: string | number,
  ) {
    if (typeof payload === 'number') {
      payload = payload.toString();
    }

    return sign(payload, this.configService.get<string>('PRIVATE_KEY'), {
      expiresIn: expiresIn,
      algorithm: 'RS256',
    });
  }

  verifyJWT(token: string): tokenValidationType {
    try {
      verify(token, this.configService.get<string>('PUBLIC_KEY'));

      return {
        valid: true,
        expired: false,
      };
    } catch (error: any) {
      if (error.message === 'jwt expired') {
        return {
          valid: true,
          expired: error.message === 'jwt expired',
        };
      } else {
        return {
          valid: false,
          expired: true,
        };
      }
    }
  }

  createAccessToken(userId: number, email: string, timeToLive: string) {
    return this.signJWT(
      {
        userId,
        email,
      },
      timeToLive,
    );
  }

  createRefreshToken(userId: number, email: string, timeToLive: string) {
    return this.signJWT(
      {
        userId,
        email,
      },
      timeToLive,
    );
  }
}
