import { IsString, Min } from 'class-validator';

export class CreatePlanDto {
  @IsString()
  planName: 'Free' | 'Premium' | 'Admin';

  @Min(0, { message: 'Price must be equal or greater than 0' })
  price: number;
}
