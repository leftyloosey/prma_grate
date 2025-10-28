import { Module } from '@nestjs/common';
import { TranslateService } from './translate.service';
import { TranslateController } from './translate.controller';
import { HttpModule } from '@nestjs/axios';
import { PrismaService } from 'src/prisma.service';
import { GTranslateModule } from 'src/g-translate/g-translate.module';
import { GTranslateService } from 'src/g-translate/g-translate.service';
// import { ScrapeService } from './scrape/scrape.service';
// import { ScrapeModule } from './scrape/scrape.module';
import { ScraperModule } from './scraper/scraper.module';

@Module({
  controllers: [TranslateController],
  providers: [TranslateService, PrismaService, GTranslateService],
  imports: [HttpModule, GTranslateModule, ScraperModule],
})
export class TranslateModule {}
