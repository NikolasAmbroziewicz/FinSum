import { IsString, IsDateString } from 'class-validator';

export class CryptoCurrencyDto {
  @IsString()
  name: string;

  @IsString()
  amount: string;

  @IsString()
  ticker: string;

  @IsDateString()
  date_bought: Date

  @IsDateString()
  date_sold?: Date

  @IsString()
  price_bought: string

  @IsString()
  price_sold?: string

  @IsString()
  stock_name: string
}