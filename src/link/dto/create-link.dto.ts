import { IsNotEmpty, IsUUID, IsUrl } from 'class-validator';

export class CreateLinkDto {
  @IsNotEmpty()
  name: string;

  @IsUrl()
  url: string;

  @IsUUID()
  userId: string;
}
