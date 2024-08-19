import { IsString, Min } from 'class-validator';
import { PlanName } from '../entities/plan.entity';

export class CreatePlanDto {
  @IsString()
  planName: PlanName;

  @Min(0, { message: 'Price must be equal or greater than 0' })
  price: number;
}
