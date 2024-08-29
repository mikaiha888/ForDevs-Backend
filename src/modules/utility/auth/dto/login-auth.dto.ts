import { IsEmail, IsNotEmpty, IsString, Length, MaxLength, MinLength } from 'class-validator';

export class LoginAuthDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(6, 100)
  password: string;
}