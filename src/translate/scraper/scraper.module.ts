import { Module } from '@nestjs/common';
import { ScraperService } from './scraper.service';
import { ScraperController } from './scraper.controller';
import { HttpModule } from '@nestjs/axios';
import { PrismaService } from 'src/prisma.service';
import { GTranslateService } from 'src/g-translate/g-translate.service';
import { GTranslateModule } from 'src/g-translate/g-translate.module';

@Module({
  controllers: [ScraperController],
  providers: [ScraperService, PrismaService, GTranslateService],
  exports: [ScraperService],
  imports: [HttpModule, GTranslateModule],
})
export class ScraperModule {}
