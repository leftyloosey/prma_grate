import { PartialType } from '@nestjs/mapped-types';
import { CreateGTranslateDto } from './create-g-translate.dto';

export class UpdateGTranslateDto extends PartialType(CreateGTranslateDto) {}
