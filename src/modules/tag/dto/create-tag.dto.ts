import { ArrayMaxSize, IsString, Length } from 'class-validator';

export class CreateTagDto {
  @IsString()
  @Length(2, 30)
  @ArrayMaxSize(10, { message: "You can't add more than 10 tags per project." })
  readonly name: string;
}
