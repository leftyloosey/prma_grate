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
}
// export interface wok {
//   batchcomplete: string;
//   warnings: { extracts: '' };
//   query: { pages: '' };
//   // query: { pages: { 1600167: { extract: '' } } };
// }

export interface extract {
  extract: object;
}
// export interface wok2 {
//   batchcomplete: string;
//   warnings: { extracts: '' };
//   query: { pages: extract };
// }
export interface wok {
  batchcomplete: string;
  warnings: { extracts: '' };
  query: { pages: extract };
}
