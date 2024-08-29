import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTechnologyDto {
  @ApiProperty({
    description: 'The name of the technology, must be a string between 1 and 30 characters',
    example: 'React',
    minLength: 1,
    maxLength: 30,
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 30)
  readonly name: string;
}
