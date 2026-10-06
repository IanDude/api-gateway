import { IsNotEmpty, IsString } from 'class-validator';

export class CreateShowDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  synopsis!: string;

  @IsString()
  originalTitle?: string;

  @IsNotEmpty()
  @IsString()
  tagline!: string;
}
