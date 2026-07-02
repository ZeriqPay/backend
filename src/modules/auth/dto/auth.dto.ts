import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
  password: string;
}

export class RegisterDto extends LoginDto {
  @IsString()
  @MinLength(3, { message: 'O nome de usuário deve ter pelo menos 3 caracteres' })
  username: string;
}
