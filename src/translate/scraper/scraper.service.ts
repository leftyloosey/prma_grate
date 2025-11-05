import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CreateTranslateDto } from '../dto/create-translate.dto';
import { HttpService } from '@nestjs/axios';
import { GTranslateService } from 'src/g-translate/g-translate.service';
import { PrismaService } from 'src/prisma.service';
import {
  endpoint,
  parseWiki,
  scrapeReturnObj,
  wikiReturn,
} from './scraper-utils/utils';
import { gReturn } from 'src/g-translate/entities/g-translate.entity';

@Injectable()
export class ScraperService {
  private tag: string = 'uk';
  private scrapeReturnObj: scrapeReturnObj;
  constructor(
    private readonly http: HttpService,
    private prisma: PrismaService,
    private google: GTranslateService,
  ) {}

  public async scrape(word: CreateTranslateDto): Promise<object> {
    if (word.tag) this.tag = word.tag;
    this.scrapeReturnObj = new scrapeReturnObj('', [], [], word.tag);
    const url = `${endpoint}/${word.text}`;

    if (word.target !== 'en') {
      const fromGoogle = await this.toGoogle(word);
      if (fromGoogle)
        this.scrapeReturnObj.definitions.push(fromGoogle.translation);

      return this.scrapeReturnObj;
    }

    try {
      const headers = {
        'User-Agent': 'ElderSlovnilk/1.0 (Node.js; CustomClient)',
      };
      await firstValueFrom(this.http.get<wikiReturn>(url, { headers })).then(
        (d) => {
          const { data } = d;

          this.scrapeReturnObj = parseWiki(data, this.tag);
          return this.scrapeReturnObj;
        },
      );
    } catch {
      const fromGoogle = await this.toGoogle(word);
      if (fromGoogle)
        this.scrapeReturnObj.definitions.push(fromGoogle.translation);
    }
    return this.scrapeReturnObj;
  }
  private async toGoogle(word: CreateTranslateDto) {
    const gResult: Promise<gReturn> = this.google.gService2(word);
    const forReturn = await gResult;

    return forReturn;
  }
}
