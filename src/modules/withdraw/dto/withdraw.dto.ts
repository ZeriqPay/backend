import { IsNumber, IsPositive, IsString, MinLength } from 'class-validator';

export class CreateWithdrawDto {
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  @MinLength(10)
  address: string;
}
