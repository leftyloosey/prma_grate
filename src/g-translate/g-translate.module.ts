import { Module } from '@nestjs/common';
import { GTranslateService } from './g-translate.service';
import { GTranslateController } from './g-translate.controller';

@Module({
  controllers: [GTranslateController],
  providers: [GTranslateService],
  exports: [GTranslateService],
})
export class GTranslateModule {}
