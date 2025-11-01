import { Controller } from '@nestjs/common';
import { GTranslateService } from './g-translate.service';

@Controller('g-translate')
export class GTranslateController {
  constructor(private readonly gTranslateService: GTranslateService) {}
}
