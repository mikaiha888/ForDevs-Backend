import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class RegisterAuthDto {
  @MinLength(1)
  @MaxLength(50)
  firstName: string;

  @MinLength(1)
  @MaxLength(50)
  lastName: string;
  
  @IsEmail()
  email: string;

  @MinLength(6)
  @MaxLength(20)
  password: string;
}
