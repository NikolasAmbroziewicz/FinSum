import { IsString, IsDateString } from 'class-validator'

export class AddAccountExpenseDto {
  @IsString()
  amount: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDateString()
  date: Date
}