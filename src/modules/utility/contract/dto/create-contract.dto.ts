import { IsUUID, IsString, IsNumber, IsEnum, IsInt } from 'class-validator';

export class CreateContractDto {
  @IsUUID()
  senderId: string;

  @IsUUID()
  receiverId: string;

  @IsString()
  title: string;

  @IsString()
  availableTime: string;

  @IsEnum(['rejected', 'pending', 'accepted'])
  status: 'rejected' | 'pending' | 'accepted';

  @IsNumber()
  amount: number;

  @IsInt()
  quantity: number;

  @IsString()
  currency: 'ARS' | 'USD' | 'EUR';

  @IsString()
  description: string;
}
