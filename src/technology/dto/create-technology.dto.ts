import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateTechnologyDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 30)
  readonly name: string;
}
