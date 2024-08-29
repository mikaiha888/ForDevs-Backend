import { Length, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({
    description: 'Rating of the review, must be between 1 and 5',
    example: 4,
    minimum: 1,
    maximum: 5,
  })
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({
    description: 'Optional comment for the review, must be between 10 and 1000 characters',
    example: 'This project was outstanding! The code quality and documentation were top-notch.',
    minLength: 10,
    maxLength: 1000,
    required: false,
  })
  @Length(10, 1000)
  comment?: string;
}
