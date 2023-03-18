export type Tokens = {
  accessToken: string,
  refreshToken: string
}

export type User = {
  id: number,
  email: string,
  iat: number, 
  exp: number
}

export interface UserWithTokens extends User {
  accessToken: string,
  refreshToken: string
}