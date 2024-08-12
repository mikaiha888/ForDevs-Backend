import { IsUUID, IsString, IsNumber, IsEnum, IsOptional } from 'class-validator';

export class CreateContractDto {
  @IsUUID()
  senderId: string;

  @IsUUID()
  receiverId: string;

  @IsString()
  subject: string;

  @IsString()
  projectDescription: string;

  @IsNumber()
  budget: number;

  @IsString()
  currency: string;

  @IsString()
  availableTime: string;

  @IsEnum(['rejected', 'pending', 'accepted'])
  status: 'rejected' | 'pending' | 'accepted';
}
