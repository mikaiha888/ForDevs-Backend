import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/modules/core/user/entities/user.entity';

export class CreateSubscriptionDto {
  @ApiProperty({
    description: 'Unique identifier for the subscription',
    example: 'sub_1234567890abcdef',
  })
  id: string;

  @ApiProperty({
    description: 'The user associated with the subscription',
    type: User,
  })
  user: User;

  @ApiProperty({
    description: 'Current status of the subscription',
    example: 'active',
  })
  status: string; 
}
