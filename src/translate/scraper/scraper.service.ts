/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CreateTranslateDto } from '../dto/create-translate.dto';
import { HttpService } from '@nestjs/axios';
import { GTranslateService } from 'src/g-translate/g-translate.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ScraperService {
  constructor(
    private readonly http: HttpService,
    private prisma: PrismaService,
    private google: GTranslateService,
  ) {}
  async scrape(word: CreateTranslateDto): Promise<object> {
    console.log(word);
    const endpoint = 'https://en.wiktionary.org/api/rest_v1/page/definition';
    const filter = new RegExp(
      '< *\\/? *[a-z]+ *( [a-z]+="[^<>"]+" *)* *\\/? *>',
      'ig',
    );
    const outArray: string[] = [];
    const exmpArray: string[] = [];
    const returnObj = {
      partOfSpeech: '',
      definitions: outArray,
      examples: exmpArray,
    };
    const url = `${endpoint}/${word.text}`;
    let tag: string = 'uk';
    if (word.tag) tag = word.tag;

    try {
      await firstValueFrom(this.http.get(url)).then((d) => {
        const { data } = d;

        function cleanString(str) {
          return str.replaceAll(filter, '').replaceAll('&nbsp;', ' ');
        }

        for (const meaning of data[tag]) {
          returnObj.partOfSpeech = meaning.partOfSpeech;
          for (const definition of meaning.definitions) {
            if (definition.definition) {
              const bob = definition.definition as string;
              if (bob.includes('abbr title="perfective aspect"') === true)
                console.log('perfect!!');
              if (bob.includes('abbr title="imperfective aspect"') === true)
                console.log('imperfect!!');
              const filteredDefinition = cleanString(definition.definition);
              outArray.push(filteredDefinition as string);
              if (definition.examples) {
                for (const example of definition.examples) {
                  const filteredExample = cleanString(example);
                  exmpArray.push(filteredExample as string);
                }
              }
            }
          }

          return returnObj;
        }
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      console.log('you had err');
      const gey = this.google.gService2(word);
      const hoo = await gey;
      if (hoo) returnObj.definitions.push(hoo);
    }

    return returnObj;
  }
}
