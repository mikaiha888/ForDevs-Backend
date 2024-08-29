import { IsString, IsOptional, IsArray } from 'class-validator';
import { Technology } from 'src/modules/auxiliary/technology/entities/technology.entity';
import { Tag } from 'src/modules/utility/tag/entities/tag.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProjectDto {
  @ApiPropertyOptional({
    description: 'The new title of the project',
    example: 'Updated Project Title',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: 'A new description of the project',
    example: 'This project is now focused on enhancing user experience.',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'New URL of the project image',
    example: 'https://example.com/new-project-image.png',
  })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiPropertyOptional({
    description: 'Updated list of tags associated with the project',
    type: [Tag],
    example: [{ id: 1, name: 'TypeScript' }, { id: 2, name: 'Backend Development' }],
  })
  @IsOptional()
  @IsArray()
  tags?: Tag[];

  @ApiPropertyOptional({
    description: 'Updated list of technologies used in the project',
    type: [Technology],
    example: [{ id: 1, name: 'GraphQL' }, { id: 2, name: 'Docker' }],
  })
  @IsOptional()
  @IsArray()
  technologies?: Technology[];
}
