import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from '../auth.controller'
import { AuthService } from '../auth.service'
import { userRegister, userLogin, userWithToken } from './mocks'

let controller: AuthController

beforeEach(async () => {
  const app: TestingModule = await Test.createTestingModule({
    controllers: [AuthController],
    providers: [AuthService]
  })
  .overrideProvider(AuthService)
  .useValue({
    signUp: jest.fn(() => {
      return {
        accessToken: '',
        refreshToken: ''
      }
    }),
    signIn: jest.fn(() => {
      return {
        accessToken: '',
        refreshToken: ''
      }
    }),
    refreshTokens: jest.fn(() => {
      return {
        accessToken: '',
        refreshToken: ''
      }
    })
  })
  .compile();

  controller = app.get<AuthController>(AuthController);
})

describe('AuthController', () => {
  it('defined', () => {
    expect(controller).toBeDefined()
  })
})

describe('AuthController > methods > signUp', () => {
  it('defined', () => {
    expect(controller.signUp).toBeDefined()
  })

  it('return refreshToken and accessToken', () => {
    expect(controller.signUp(userRegister)).toEqual({
      accessToken: expect.any(String),
      refreshToken: expect.any(String)
    })
  })  
})

describe('AuthController > methods > singIn', () => {
  it('defined', () => {
    expect(controller.signIn).toBeDefined()
  })

  it('return refreshToken and accessToken', () => {
    expect(controller.signIn(userLogin)).toEqual({
      accessToken: expect.any(String),
      refreshToken: expect.any(String)
    })
  })
})

describe('AuthController > methods > refreshToken', () => {
  it('defined', () => {
    expect(controller.refreshTokens).toBeDefined()
  })

  it("return refreshToken and accessToken", () => {
    expect(controller.refreshTokens(userWithToken)).toEqual({
      accessToken: expect.any(String),
      refreshToken: expect.any(String)
    })
  })
})