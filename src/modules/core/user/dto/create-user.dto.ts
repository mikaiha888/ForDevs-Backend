import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { Plan } from 'src/modules/core/plan/entities/plan.entity';

export class CreateUserDto {
  @ApiProperty({
    description: 'First name of the user',
    example: 'John',
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  firstName: string;

  @ApiProperty({
    description: 'Last name of the user',
    example: 'Doe',
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  lastName: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password for the user account',
    example: 'strongPassword123',
  })
  @IsNotEmpty()
  @IsString()
  @Length(6, 100)
  password: string;

  @ApiPropertyOptional({
    description: 'A brief bio of the user',
    example: 'Software Developer with 10 years of experience.',
  })
  @IsOptional()
  @IsString()
  @Length(0, 300)
  bio?: string;

  @ApiPropertyOptional({
    description: 'A detailed description about the user',
    example: 'I am passionate about coding, especially in JavaScript and Python...',
  })
  @IsOptional()
  @IsString()
  @Length(0, 5000)
  aboutMe?: string;

  @ApiPropertyOptional({
    description: 'URL of the user profile image',
    example: 'https://example.com/images/profile.jpg',
  })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional({
    description: 'URL of the user cover image',
    example: 'https://example.com/images/cover.jpg',
  })
  @IsOptional()
  @IsString()
  coverImage?: string;

  @ApiPropertyOptional({
    description: 'Plan associated with the user',
    type: () => Plan,
  })
  @IsOptional()
  @IsString()
  plan?: Plan;
}
