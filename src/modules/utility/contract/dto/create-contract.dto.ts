import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsNumber, IsEnum, IsInt } from 'class-validator';

export class CreateContractDto {
  @ApiProperty({
    description: 'UUID of the sender creating the contract',
    example: 'b3d19c19-8ff4-4c6e-9f39-81fbd763b6c4',
    required: true,
  })
  @IsUUID()
  senderId: string;

  @ApiProperty({
    description: 'UUID of the receiver of the contract',
    example: 'c4d19c19-8ff4-4c6e-9f39-81fbd763b6c4',
    required: true,
  })
  @IsUUID()
  receiverId: string;

  @ApiProperty({
    description: 'Title of the contract',
    example: 'Web Development Project',
    required: true,
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Available time for the contract to be fulfilled',
    example: '10 days',
    required: true,
  })
  @IsString()
  availableTime: string;

  @ApiProperty({
    description: 'Status of the contract',
    example: 'pending',
    enum: ['rejected', 'pending', 'accepted'],
    required: true,
  })
  @IsEnum(['rejected', 'pending', 'accepted'])
  status: 'rejected' | 'pending' | 'accepted';

  @ApiProperty({
    description: 'Total amount for the contract',
    example: 500.00,
    required: true,
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: 'Quantity involved in the contract (e.g., number of units, hours, etc.)',
    example: 1,
    required: true,
  })
  @IsInt()
  quantity: number;

  @ApiProperty({
    description: 'Currency type for the payment in the contract',
    example: 'USD',
    enum: ['ARS', 'USD', 'EUR'],
    required: true,
  })
  @IsString()
  currency: 'ARS' | 'USD' | 'EUR';

  @ApiProperty({
    description: 'Detailed description of the contract',
    example: 'Development of a full-stack web application including backend and frontend',
    required: true,
  })
  @IsString()
  description: string;
}
