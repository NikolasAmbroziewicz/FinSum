import { IsString, IsDateString } from 'class-validator';

export class IcomeDto {
  @IsString()
  amount: string;

  @IsString()
  name: string;

  @IsString()
  currency: string;

  @IsDateString()
  date: Date
}
