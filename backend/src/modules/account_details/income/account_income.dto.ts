import { IsString, IsDateString } from 'class-validator'

export class AccountIncomeDto {
  @IsString()
  amount: string;

  @IsString()
  title: string;

  @IsString()
  currency: string;

  @IsDateString()
  date: Date;
}