import { IsString, IsDateString, IsOptional } from 'class-validator'

export class CryptoDetailsDto {
  @IsString()
  name: string

  @IsString()
  amount: string

  @IsString()
  ticker: string

  @IsString()
  price_bought: string
  
  @IsString()
  @IsOptional()
  price_sold?: string

  @IsDateString()
  date_bought: Date

  @IsDateString()
  @IsOptional()
  date_sold?: Date

  @IsString()
  stock_name: string
}