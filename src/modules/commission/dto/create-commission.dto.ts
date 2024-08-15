import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateCommissionDto {
  @IsNotEmpty()
  @IsNumber()
  rate: number;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  contractId: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  createdAt?: Date;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  updatedAt?: Date;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  deletedAt?: Date;
}
