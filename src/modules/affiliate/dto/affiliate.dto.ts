import { IsString, MinLength } from 'class-validator';

export class CreateAffiliateCodeDto {
  @IsString()
  @MinLength(3)
  code: string;
}
