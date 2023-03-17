
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JsonWebTokenError } from 'jsonwebtoken';

export class RefreshTokenGuards extends AuthGuard('jwt-refresh') {
  constructor() {
    super();
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext, status?: any) {
    if(info instanceof JsonWebTokenError) {
      throw new UnauthorizedException({
        accessToken: null,
        refreshToken: null
      });
    }

    return super.handleRequest(err, user, info, context, status)
  }
}