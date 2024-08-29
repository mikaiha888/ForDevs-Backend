import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, IsString, Length } from 'class-validator';

export class CreateTagDto {
  @ApiProperty({
    description: 'The name of the tag, which should be between 2 and 30 characters long.',
    example: 'Frontend',
    maxLength: 30,
    minLength: 2,
  })
  @IsString()
  @Length(2, 30)
  readonly name: string;
}
