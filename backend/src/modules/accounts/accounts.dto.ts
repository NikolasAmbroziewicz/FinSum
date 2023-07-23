import { IsString } from 'class-validator';

export class AccountsDto {
  @IsString()
  title: string;

  @IsString()
  currency: string;
}
