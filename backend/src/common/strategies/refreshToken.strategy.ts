import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UserWithTokens } from 'src/auth/auth.type';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('x-refresh-token'),
      secretOrKey: config.get<string>('PUBLIC_KEY'),
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: UserWithTokens) {
    const accessToken = req.get('authorization').replace('Bearer', '').trim();
    const refreshToken = req.get('x-refresh-token');

    return {
      ...payload,
      refreshToken,
      accessToken,
    };
  }
}
