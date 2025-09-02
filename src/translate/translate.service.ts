/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// import * as cheerio from 'cheerio';
// import { wok } from './dto/create-translate.dto';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import {
  CreateTranslateDto,
  CreateDoubleDto,
} from './dto/create-translate.dto';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TranslateService {
  constructor(
    private readonly http: HttpService,
    private prisma: PrismaService,
  ) {}

  getAllWords() {
    return this.prisma.words.findMany();
  }
  async submitWord(word: CreateTranslateDto) {
    const options = {
      method: 'POST',

      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization:
          'a_dRfa1g7PIPqnrU9QXvq15fwHvbYGm233r6sXCq0X7bUpGrJRWE4IRVWbbvuv28KI8NdCTntm477MxURN',
      },
    };
    const datar = {
      platform: 'api',
      to: 'en_US',
      from: 'uk_UA',
      data: word.text,
    };
    const url = 'https://api-b2b.backenster.com/b1/api/v3/translate';
    type res = {
      data: object;
      result: string;
    };

    const { data } = await firstValueFrom(
      this.http.post(url, datar, options).pipe(),
    );
    const returnObject: res = { data: data, result: data.result };
    const { text } = word;
    console.log(returnObject.result);
    const forBack = {
      original: text,
      translation: returnObject.result,
    };
    const horse = await this.createLocalTranslation(forBack);
    return horse;
  }

  createLocalTranslation(createDoubleDto: CreateDoubleDto) {
    const translateSubmission = this.prisma.words.create({
      data: {
        original: createDoubleDto.original,
        translation: createDoubleDto.translation,
      },
    });
    return translateSubmission;
  }
  // destruc(data: wok): wok {
  //   let empty: wok = {
  //     batchcomplete: '',
  //     warnings: { extracts: '' },
  //     query: { pages: { extract: {} } },
  //   };
  //   for (const [key, value] of Object.entries(data.query.pages)) {
  //     console.log(`not here ${key}: ${value}`);
  //     [value].map((o) => {
  //       const { extract } = o;
  //       console.log('HERE', o);
  //       empty = extract;
  //       console.log('alllooooo', empty);
  //       return empty;
  //     });
  //   }
  //   return empty;
  // }
  async scrape(word: CreateTranslateDto): Promise<object> {
    const endpoint = 'https://en.wiktionary.org/api/rest_v1/page/definition';
    const filter = new RegExp(
      '< *\\/? *[a-z]+ *( [a-z]+="[^<>"]+" *)* *\\/? *>',
      'ig',
    );
    let output = '';
    const outArray: string[] = [];
    const exmpArray: string[] = [];
    const returnObj = {
      partOfSpeech: '',
      definitions: outArray,
      examples: exmpArray,
    };
    const url = `${endpoint}/${word.text}`;
    // const resObj = await fetch(url, { orgin: 'test' });
    await firstValueFrom(this.http.get(url)).then((d) => {
      const { data } = d;
      // console.log(data);
      function cleanString(str) {
        return str.replaceAll(filter, '').replaceAll('&nbsp;', ' ');
      }

      // let output = '';
      for (const meaning of data.uk) {
        output += meaning.partOfSpeech;
        returnObj.partOfSpeech = meaning.partOfSpeech;
        for (const definition of meaning.definitions) {
          if (definition.definition) {
            const filteredDefinition = cleanString(definition.definition);
            output += `\n- ${filteredDefinition}`;
            outArray.push(filteredDefinition as string);
            if (definition.examples) {
              for (const example of definition.examples) {
                const filteredExample = cleanString(example);
                output += `\n    "${filteredExample}"`;
                exmpArray.push(filteredExample as string);
              }
            }
          }
        }
        output += '\n\n';
        console.log('final return', output);
        console.log(returnObj);
        return returnObj;
        // return output;
      }
    });
    return returnObj;
    // return JSON.stringify(output);

    // const res = await resObj.json();

    // function cleanString(str) {
    //   return str.replaceAll(filter, '').replaceAll('&nbsp;', ' ');
    // }

    // let output = '';
    // for (let meaning of res.uk) {
    //   output += meaning.partOfSpeech;
    //   for (let definition of meaning.definitions) {
    //     if (definition.definition) {
    //       let filteredDefinition = cleanString(definition.definition);
    //       output += `\n- ${filteredDefinition}`;
    //       if (definition.examples) {
    //         for (let example of definition.examples) {
    //           let filteredExample = cleanString(example);
    //           output += `\n    "${filteredExample}"`;
    //         }
    //       }
    //     }
    //   }
    //   output += '\n\n';
    // }
    // return output;
  }
}
