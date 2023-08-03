import { IsString } from 'class-validator'

export class CyrptoAccountDto {
  @IsString()
  title: string
}