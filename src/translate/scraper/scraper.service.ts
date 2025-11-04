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
  private outArray: string[] = [];
  private exmpArray: string[] = [];
  // private returnObj = {
  //   partOfSpeech: '',
  //   definitions: this.outArray,
  //   examples: this.exmpArray,
  // };
  private scrapeReturnObj = new scrapeReturnObj('', [], []);
  constructor(
    private readonly http: HttpService,
    private prisma: PrismaService,
    private google: GTranslateService,
  ) {}

  public async scrape(word: CreateTranslateDto): Promise<object> {
    this.scrapeReturnObj = new scrapeReturnObj('', [], []);
    if (word.tag) this.tag = word.tag;

    const url = `${endpoint}/${word.text}`;

    if (word.target !== 'en') {
      const fromGoogle = await this.toGoogle(word);
      if (fromGoogle)
        this.scrapeReturnObj.definitions.push(fromGoogle.translation);
      return this.scrapeReturnObj;
    }

    try {
      await firstValueFrom(this.http.get<wikiReturn>(url)).then((d) => {
        const { data } = d;

        this.scrapeReturnObj = parseWiki(data, this.tag);
        return this.scrapeReturnObj;
      });
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
