import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTranslateDto {
  @IsNotEmpty()
  @IsString()
  text: string;
  @IsNotEmpty()
  @IsString()
  tag: string;
  @IsNotEmpty()
  @IsString()
  target: string;
}
// export class CursorDto {
//   @IsString()
//   original: string;
// }
export class OffsetDto {
  @IsNumber()
  page: number;
  @IsString()
  tag: string;
  @IsString()
  usersId: string;
}
export class LangTagDto {
  @IsNotEmpty()
  @IsString()
  tag: string;
}

export class AheadDto {
  @IsString()
  ahead: string;
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
  tag: string;
  usersId: string;
}
