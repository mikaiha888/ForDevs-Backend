import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';
import { Technology } from 'src/modules/auxiliary/technology/entities/technology.entity';
import { Tag } from 'src/modules/utility/tag/entities/tag.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({
    description: 'The title of the project',
    example: 'My Awesome Project',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({
    description: 'A brief description of the project',
    example: 'This is a project to build a collaborative platform.',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'URL of the project image',
    example: 'https://example.com/project-image.png',
  })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiPropertyOptional({
    description: 'List of tags associated with the project',
    type: [Tag],
    example: [{ id: 1, name: 'JavaScript' }, { id: 2, name: 'Web Development' }],
  })
  @IsOptional()
  @IsArray()
  tags?: Tag[];

  @ApiPropertyOptional({
    description: 'List of technologies used in the project',
    type: [Technology],
    example: [{ id: 1, name: 'React' }, { id: 2, name: 'Node.js' }],
  })
  @IsOptional()
  @IsArray()
  technologies?: Technology[];

  @ApiProperty({
    description: 'The ID of the user who created the project',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  userId: string;
}
