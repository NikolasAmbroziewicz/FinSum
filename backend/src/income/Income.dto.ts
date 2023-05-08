import { IsString } from 'class-validator';

export class IcomeDto {
  @IsString()
  amount: string;

  @IsString()
  name: string;

  @IsString()
  currency: string;
}
