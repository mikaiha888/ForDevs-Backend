import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginAuthDto {
  @ApiProperty({
    description: 'Email address of the user',
    example: 'user@example.com',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password for the user account',
    example: 'StrongPassword123',
    required: true,
    minLength: 6,
    maxLength: 100,
  })
  @IsNotEmpty()
  @Length(6, 100)
  password: string;
}
