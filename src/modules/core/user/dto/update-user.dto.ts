import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'First name of the user',
    example: 'John',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  firstName?: string;

  @ApiProperty({
    description: 'Last name of the user',
    example: 'Doe',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  lastName?: string;

  @ApiProperty({
    description: 'Password for the user account',
    example: 'StrongPassword123',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(6, 100)
  password?: string;

  @ApiProperty({
    description: 'Short bio of the user',
    example: 'Software developer with 5 years of experience in web development.',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(0, 300)
  bio?: string;

  @ApiProperty({
    description: 'Detailed information about the user',
    example: 'I am a full-stack developer with expertise in React and Node.js.',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(0, 5000)
  aboutMe?: string;

  @ApiProperty({
    description: 'URL of the user profile image',
    example: 'https://example.com/profile.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({
    description: 'URL of the cover image for the user profile',
    example: 'https://example.com/cover.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  coverImage?: string;
}
