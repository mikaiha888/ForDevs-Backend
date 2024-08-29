import {
  IsString,
  IsNumber,
  IsArray,
  IsOptional,
} from 'class-validator';

export class CreatePlanDto {
  @IsString()
  name: 'Free' | 'Premium';

  @IsNumber()
  amount: number;

  @IsNumber()
  quantity: number;

  @IsString()
  currency: 'ARS' | 'USD' | 'EUR';

  @IsString()
  description: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  features?: string[];
}
