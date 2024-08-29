import { ApiProperty } from '@nestjs/swagger';

export class CreateLikeDto {
  @ApiProperty({
    description: 'UUID of the user who is liking the project',
    example: 'a1d19c19-8ff4-4c6e-9f39-81fbd763b6c4',
    required: true,
  })
  userId: string;

  @ApiProperty({
    description: 'UUID of the project being liked',
    example: 'b2e19d29-8gf4-4d6e-9a29-72fbd763b7d5',
    required: true,
  })
  projectId: string;
}
