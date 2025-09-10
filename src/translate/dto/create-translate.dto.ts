import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTranslateDto {
  @IsNotEmpty()
  @IsString()
  text: string;
}
export class CreateDoubleDto {
  @IsNotEmpty()
  @IsString()
  original: string;
  @IsNotEmpty()
  @IsString()
  translation: string;
  @IsNotEmpty()
  @IsString()
  partOfSpeech: string;
  examples: string[];
  definitions: string[];
  case: string;
}
