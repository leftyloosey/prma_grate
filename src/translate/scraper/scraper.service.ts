import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CreateTranslateDto } from '../dto/create-translate.dto';
import { HttpService } from '@nestjs/axios';
import { GTranslateService } from 'src/g-translate/g-translate.service';
import { PrismaService } from 'src/prisma.service';
import { endpoint, parseWiki, wikiReturn } from './scraper-utils/utils';
import { gReturn } from 'src/g-translate/entities/g-translate.entity';

@Injectable()
export class ScraperService {
  private tag: string = 'uk';
  private outArray: string[] = [];
  private exmpArray: string[] = [];
  private returnObj = {
    partOfSpeech: '',
    definitions: this.outArray,
    examples: this.exmpArray,
  };

  constructor(
    private readonly http: HttpService,
    private prisma: PrismaService,
    private google: GTranslateService,
  ) {}

  private async toGoogle(word: CreateTranslateDto) {
    const gResult: Promise<gReturn> = this.google.gService2(word);
    const forReturn = await gResult;

    return forReturn;
  }
  public async scrape(word: CreateTranslateDto): Promise<object> {
    if (word.tag) this.tag = word.tag;

    const url = `${endpoint}/${word.text}`;

    if (word.target !== 'en') {
      const fromGoogle = await this.toGoogle(word);
      if (fromGoogle) this.returnObj.definitions.push(fromGoogle.translation);
      return this.returnObj;
    }

    try {
      await firstValueFrom(this.http.get<wikiReturn>(url)).then((d) => {
        const { data } = d;

        this.returnObj = parseWiki(data, this.tag);
        return this.returnObj;
      });
    } catch {
      const fromGoogle = await this.toGoogle(word);
      if (fromGoogle) this.returnObj.definitions.push(fromGoogle.translation);
    }

    return this.returnObj;
  }
}
