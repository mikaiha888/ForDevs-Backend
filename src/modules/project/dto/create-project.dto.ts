import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';
import { Technology } from 'src/modules/technology/entities/technology.entity';
import { Tag } from 'src/modules/tag/entities/tag.entity';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  title: string;

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

  @IsNotEmpty()
  userId: string;
}
