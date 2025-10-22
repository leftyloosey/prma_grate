/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import {
  CreateTranslateDto,
  CreateDoubleDto,
  OffsetDto,
  AheadDto,
} from './dto/create-translate.dto';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from '../prisma.service';
import { UpdateTranslateDto } from './dto/update-translate.dto';

@Injectable()
export class TranslateService {
  constructor(
    private readonly http: HttpService,
    private prisma: PrismaService,
  ) {}

  getAllWords() {
    return this.prisma.words.findMany();
  }

  async getFirstFiftyWords() {
    const totalWords = await this.prisma.words.count();
    const firstQueryResults = await this.prisma.words.findMany({
      take: 50,
      orderBy: {
        id: 'asc',
      },
    });

    const lastPostInResults = firstQueryResults[49];
    const myCursor = lastPostInResults.original;
    // const myCursor = lastPostInResults.id;
    return { totalWords, firstQueryResults, myCursor, lastPostInResults };
  }

  async getFiftyOffset(pageNumber: OffsetDto) {
    const totalWords = await this.prisma.words.count();
    const { page } = pageNumber;
    console.log('zoome!', page);

    if (page < 0) {
      const firstQueryResults = await this.prisma.words.findMany({
        take: 50,
        skip: totalWords + 50 * page,
        orderBy: {
          id: 'asc',
        },
      });
      return { totalWords, firstQueryResults };
    }
    const firstQueryResults = await this.prisma.words.findMany({
      take: 50,
      skip: 50 * page,
      orderBy: {
        id: 'asc',
      },
    });

    return { totalWords, firstQueryResults };
  }
  // async getNextFiftyWords(cursor: CursorDto) {
  //   const totalWords = await this.prisma.words.count();
  //   const { original } = cursor;
  //   console.log('zoome!', original);
  //   const firstQueryResults = await this.prisma.words.findMany({
  //     take: 50,
  //     skip: 1,
  //     cursor: {
  //       original: original,
  //     },
  //     orderBy: {
  //       id: 'asc',
  //     },
  //   });

  //   const lastPostInResults = firstQueryResults[49];
  //   const myCursor = lastPostInResults.original;
  //   return { totalWords, firstQueryResults, myCursor, lastPostInResults };
  // }

  createLocalTranslation(createDoubleDto: CreateDoubleDto) {
    const translateSubmission = this.prisma.words.create({
      data: {
        original: createDoubleDto.original,
        translation: createDoubleDto.translation,
        partOfSpeech: createDoubleDto.partOfSpeech,
        definitions: createDoubleDto.definitions,
        examples: createDoubleDto.examples,
        case: createDoubleDto.case,
        timestamp: new Date(),
      },
    });
    return translateSubmission;
  }

  getWordById(id: string) {
    return this.prisma.words.findUnique({
      where: { id: id },
    });
  }
  update(updateTranslateDto: UpdateTranslateDto, id: string) {
    console.log(id);
    return this.prisma.words.update({
      where: {
        id: id,
      },
      data: updateTranslateDto,
    });
  }

  searchAhead(ahead: AheadDto) {
    return this.prisma.words.findMany({
      where: {
        original: {
          startsWith: ahead.ahead,
        },
      },
      select: { original: true, id: true },
    });
  }

  async scrape(word: CreateTranslateDto): Promise<object> {
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
    await firstValueFrom(this.http.get(url)).then((d) => {
      const { data } = d;

      function cleanString(str) {
        return str.replaceAll(filter, '').replaceAll('&nbsp;', ' ');
      }

      for (const meaning of data.uk) {
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

        console.log(returnObj);
        return returnObj;
      }
    });
    return returnObj;
  }
}
