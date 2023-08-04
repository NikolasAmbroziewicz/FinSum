import { IsString } from 'class-validator'

export class CryptoAccountDto {
  @IsString()
  title: string
}