import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl, IsUUID } from 'class-validator';

export class CreateLinkDto {
  @ApiProperty({
    description: 'The name of the link, typically a label or title.',
    example: 'GitHub Profile',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The URL of the link, must be a valid URL.',
    example: 'https://github.com/username',
    required: true,
  })
  @IsNotEmpty()
  @IsUrl()
  url: string;

  @ApiProperty({
    description: 'The UUID of the user to whom this link belongs.',
    example: 'c1d20f19-9gf4-4f6e-9f29-83fbd763c8d6',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
