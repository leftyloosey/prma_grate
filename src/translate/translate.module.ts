import { Module } from '@nestjs/common';
import { TranslateService } from './translate.service';
import { TranslateController } from './translate.controller';
import { HttpModule } from '@nestjs/axios';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TranslateController],
  providers: [TranslateService, PrismaService],
  imports: [HttpModule],
})
export class TranslateModule {}
