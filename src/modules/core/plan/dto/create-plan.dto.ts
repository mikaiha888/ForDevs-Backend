import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

export class CreatePlanDto {
  @ApiProperty({
    description: 'Name of the plan',
    example: 'Premium',
    enum: ['Free', 'Premium'],
  })
  @IsString()
  name: 'Free' | 'Premium';

  @ApiProperty({
    description: 'Amount to be charged for the plan',
    example: 49.99,
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: 'Quantity associated with the plan (e.g., number of months)',
    example: 12,
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    description: 'Currency for the plan price',
    example: 'USD',
    enum: ['ARS', 'USD', 'EUR'],
  })
  @IsString()
  currency: 'ARS' | 'USD' | 'EUR';

  @ApiProperty({
    description: 'Description of the plan',
    example: 'This plan offers premium features with unlimited access.',
  })
  @IsString()
  description: string;

  @ApiPropertyOptional({
    description: 'Features included in the plan',
    example: ['Unlimited access', 'Priority support', 'No ads'],
    type: [String],
  })
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  features?: string[];
}
