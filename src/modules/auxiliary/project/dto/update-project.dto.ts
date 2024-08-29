import { IsString, IsOptional, IsArray } from 'class-validator';
import { Technology } from 'src/modules/auxiliary/technology/entities/technology.entity';
import { Tag } from 'src/modules/utility/tag/entities/tag.entity';

export class UpdateProjectDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsOptional()
  @IsArray()
  tags?: Tag[];

  @IsOptional()
  @IsArray()
  technologies?: Technology[];
}
