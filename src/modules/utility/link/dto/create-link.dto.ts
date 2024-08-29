import { IsNotEmpty, IsString, IsUrl, IsUUID } from 'class-validator';

export class CreateLinkDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsUrl()
  url: string;

  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
