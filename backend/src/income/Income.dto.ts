import { IsDecimal, IsNumber, IsOptional, IsString } from 'class-validator';

export class IcomeDto {
  @IsNumber()
  value: number;

  @IsString()
  name: string;

  @IsString()
  currency: string;
}
