import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException } from '@nestjs/common';

import { AuthService } from '../auth.service';

import { ConfigService } from '@nestjs/config';

import { TokensService } from '../../tokens/tokens.service';
import { PrismaService } from '../../prisma/prisma.service';

import {
  userRegister,
  userResponseFromDataBase,
  userLogin,
  userWithToken,
} from './mocks';

//Services
let service: AuthService;
let tokenService: TokensService;
let configService: ConfigService;

// Mocks Function
const createUserMock = jest.fn();
const findUniqueUserMock = jest.fn();

const generateTokens = (
  accessTokenTime = configService.get<string>('ACCESS_TOKEN_TIME_TO_LIVE'),
) => {
  const tokens = {
    accessToken: tokenService.createRefreshToken(
      userWithToken.userId,
      userWithToken.email,
      accessTokenTime,
    ),
    refreshToken: tokenService.createRefreshToken(
      userWithToken.userId,
      userWithToken.email,
      configService.get<string>('REFRESH_TOKEN_TIME_TO_LIVE'),
    ),
  };

  return {
    ...userWithToken,
    ...tokens,
  };
};

beforeEach(async () => {
  const app: TestingModule = await Test.createTestingModule({
    providers: [
      AuthService,
      TokensService,
      ConfigService,
      {
        provide: PrismaService,
        useValue: {
          user: {
            findUnique: findUniqueUserMock,
            create: createUserMock,
          },
        },
      },
    ],
  }).compile();

  service = app.get<AuthService>(AuthService);
  configService = app.get<ConfigService>(ConfigService);
  tokenService = app.get<TokensService>(TokensService);
});

describe('AuthService', () => {
  it('defined', () => {
    expect(service).toBeDefined();
  });
});

describe('AuthService > methods > signUp', () => {
  it('defined', () => {
    expect(service.signUp).toBeDefined();
  });
  it('should return refresh and access token when user data is correct', async () => {
    createUserMock.mockResolvedValueOnce(userResponseFromDataBase);
    const serviceMethod = await service.signUp(userRegister);

    expect(serviceMethod).toEqual({
      user: {
        name: expect.any(String),
        surname: expect.any(String),
        email: expect.any(String),
      },
      tokens: {
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      },
    });
  });
});

describe('AuthService > methods > signIn', () => {
  it('defined', () => {
    expect(service.signIn).toBeDefined();
  });
  it('should return refresh and access token when user credentials are correct', async () => {
    findUniqueUserMock.mockResolvedValueOnce(userResponseFromDataBase);

    const serviceMethod = await service.signIn(userLogin);

    expect(serviceMethod).toEqual({
      user: {
        name: expect.any(String),
        surname: expect.any(String),
        email: expect.any(String),
      },
      tokens: {
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      },
    });
  });

  it("should throw error when email don't exist", async () => {
    findUniqueUserMock.mockResolvedValueOnce(null);

    await expect(service.signIn(userLogin)).rejects.toEqual(
      new ForbiddenException("User doesn't exist"),
    );
  });

  it('should throw error when password is incorrect', async () => {
    findUniqueUserMock.mockResolvedValueOnce(userResponseFromDataBase);

    await expect(
      service.signIn({
        ...userRegister,
        password: 'incorrectPassword',
      }),
    ).rejects.toEqual(new ForbiddenException('Incorrect Email or Password'));
  });
});

describe('AuthService > methods > refreshTokens', () => {
  it('defined', () => {
    expect(service.refreshTokens).toBeDefined();
  });

  it('should throw error when no accessToken', async () => {
    const UserWithTokensPayload = generateTokens();
    findUniqueUserMock.mockResolvedValueOnce({ id: 1})

    await expect(
      service.refreshTokens({
        ...UserWithTokensPayload,
        accessToken: null,
      }),
    ).rejects.toEqual(new ForbiddenException('Unauthorized'));
  });

  it('Should throw error when there is no user', async  () => {
    const UserWithTokensPayload = generateTokens();
    findUniqueUserMock.mockResolvedValueOnce({ id: null})

    await expect(
      service.refreshTokens({
        ...UserWithTokensPayload,
        accessToken: null,
      }),
    ).rejects.toEqual(new ForbiddenException('Unauthorized'));
  })

  it('should return accessToken and refreshToken when accessToken is not expired and is valid', async () => {
    const UserWithTokensPayload = generateTokens();
    findUniqueUserMock.mockResolvedValueOnce({ id: 1})

    const serviceMethod = await service.refreshTokens(UserWithTokensPayload);

    expect(serviceMethod).toEqual({
      accessToken: UserWithTokensPayload.accessToken,
      refreshToken: UserWithTokensPayload.refreshToken,
    });
  });

  it('should return null when access token is invalid', async () => {
    const UserWithTokensPayload = generateTokens();
    findUniqueUserMock.mockResolvedValueOnce({ id: 1})

    const serviceMethod = await service.refreshTokens({
      ...UserWithTokensPayload,
      accessToken: 'IncorrectToken',
    });

    expect(serviceMethod).toEqual({
      accessToken: null,
      refreshToken: null,
    });
  });

  it('should return new accessToken when is expired', async () => {
    const UserWithTokensPayload = generateTokens('-10s');
    findUniqueUserMock.mockResolvedValueOnce({ id: 1})

    const serviceMethod = await service.refreshTokens(UserWithTokensPayload);

    expect(serviceMethod).toEqual({
      accessToken: expect.any(String),
      refreshToken: UserWithTokensPayload.refreshToken,
    });
  });
});
