import { IsString, Min } from 'class-validator';
import { Name } from '../entities/plan.entity';

export class CreatePlanDto {
  @IsString()
  name: Name;

  @Min(0, { message: 'Price must be equal or greater than 0' })
  price: number;
}
