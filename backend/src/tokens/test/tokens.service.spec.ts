import { Test, TestingModule } from '@nestjs/testing';

import { ConfigService } from '@nestjs/config';
import { TokensService } from '../tokens.service';

import { userData } from './mocks';

let service: TokensService;
let configService: ConfigService;

beforeEach(async () => {
  const app: TestingModule = await Test.createTestingModule({
    providers: [TokensService, ConfigService],
  }).compile();

  service = app.get<TokensService>(TokensService);
  configService = app.get<ConfigService>(ConfigService);
});

describe('TokensService ', () => {
  it('defined', () => {
    expect(service).toBeDefined();
  });
});

describe('TokenService > methods > signJWT', () => {
  it('defined', () => {
    expect(service.signJWT).toBeDefined();
  });

  it('should SignJWT and return token', () => {
    const serviceMethod = service.signJWT(
      userData,
      configService.get<string>('ACCESS_TOKEN_TIME_TO_LIVE'),
    );

    expect(serviceMethod).toEqual(expect.any(String));
  });
});

describe('TokensService > methods > verifyJWT', () => {
  it('defined', () => {
    expect(service.verifyJWT).toBeDefined();
  });
});

describe('TokensService > methods > createAccessToken', () => {
  it('defined', () => {
    expect(service.createAccessToken).toBeDefined();
  });
});

describe('TokensService > methods > createRefreshToken', () => {
  it('defined', () => {
    expect(service.createRefreshToken).toBeDefined();
  });
});
