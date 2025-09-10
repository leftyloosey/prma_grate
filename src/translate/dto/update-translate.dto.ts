import { PartialType } from '@nestjs/mapped-types';
// import { IsNotEmpty, IsString } from 'class-validator';
import { CreateTranslateDto } from './create-translate.dto';

export class UpdateTranslateDto extends PartialType(CreateTranslateDto) {
  id: string;
  original: string;
  translation: string;
  partOfSpeech: string;
  examples: string[];
  definitions: string[];
  case: string;
}
