import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import {
  // CreateTranslateDto,
  CreateDoubleDto,
  OffsetDto,
  AheadDto,
} from './dto/create-translate.dto';
// import { firstValueFrom } from 'rxjs';
import { PrismaService } from '../prisma.service';
import { UpdateTranslateDto } from './dto/update-translate.dto';
import { GTranslateService } from 'src/g-translate/g-translate.service';
// import { ScrapeService } from './scrape/scrape.service';

@Injectable()
export class TranslateService {
  constructor(
    private readonly http: HttpService,
    private prisma: PrismaService,
    private google: GTranslateService,
    // private scrap: ScrapeService,
  ) {}

  async getAllWords() {
    const all = await this.prisma.words.findMany();
    return all;
  }

  // async getFirstFiftyWords() {
  //   const totalWords = await this.prisma.words.count();
  //   const firstQueryResults = await this.prisma.words.findMany({
  //     take: 50,
  //     orderBy: {
  //       id: 'asc',
  //     },
  //   });

  //   const lastPostInResults = firstQueryResults[49];
  //   const myCursor = lastPostInResults.original;
  //   // const myCursor = lastPostInResults.id;
  //   return { totalWords, firstQueryResults, myCursor, lastPostInResults };
  // }

  async getFiftyOffset(pageAndTag: OffsetDto) {
    const totalWords = await this.prisma.words.count();
    const { page } = pageAndTag;
    const { tag } = pageAndTag;

    // if (!tag) {
    //   if (page < 0) {
    //     const firstQueryResults = await this.prisma.words.findMany({
    //       take: 50,
    //       skip: totalWords + 50 * page,
    //       orderBy: {
    //         id: 'asc',
    //       },
    //     });
    //     return { totalWords, firstQueryResults };
    //   }
    //   const firstQueryResults = await this.prisma.words.findMany({
    //     take: 50,
    //     skip: 50 * page,
    //     orderBy: {
    //       id: 'asc',
    //     },
    //   });

    //   return { totalWords, firstQueryResults };
    // } else {
    if (page < 0) {
      const firstQueryResults = await this.prisma.words.findMany({
        where: { tag: tag },
        take: 50,
        skip: totalWords + 50 * page,
        orderBy: {
          id: 'asc',
        },
      });
      return { totalWords, firstQueryResults };
    }
    const firstQueryResults = await this.prisma.words.findMany({
      where: { tag: tag },
      take: 50,
      skip: 50 * page,
      orderBy: {
        id: 'asc',
      },
    });

    return { totalWords, firstQueryResults };
    // }
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

  async createLocalTranslation(createDoubleDto: CreateDoubleDto) {
    const translateSubmission = await this.prisma.words.create({
      data: {
        original: createDoubleDto.original,
        translation: createDoubleDto.translation,
        partOfSpeech: createDoubleDto.partOfSpeech,
        definitions: createDoubleDto.definitions,
        examples: createDoubleDto.examples,
        case: createDoubleDto.case,
        tag: createDoubleDto.tag,
        usersId: createDoubleDto.usersId,
        timestamp: new Date(),
      },
    });
    return translateSubmission;
  }

  async getWordById(id: string) {
    const word = await this.prisma.words.findUnique({
      where: { id: id },
    });
    return word;
  }
  async update(updateTranslateDto: UpdateTranslateDto, id: string) {
    const update = await this.prisma.words.update({
      where: {
        id: id,
      },
      data: updateTranslateDto,
    });
    return update;
  }
  // async findAndUpdate() {
  //   const updateUsers = await this.prisma.words.updateMany({
  //     where: {
  //       tag: {
  //         equals: 'uk',
  //       },
  //     },
  //     data: {
  //       usersId: '689360ca43f25f4f5d6d9e24',
  //     },
  //   });
  //   return updateUsers;
  // }

  async upsert(updateTranslateDto: UpdateTranslateDto) {
    if (updateTranslateDto.id) {
      const word = await this.update(updateTranslateDto, updateTranslateDto.id);
      return word;
    }

    const word = await this.prisma.words.upsert({
      where: {
        original: updateTranslateDto.original,
      },
      update: {
        original: updateTranslateDto.original,
        translation: updateTranslateDto.translation,
        partOfSpeech: updateTranslateDto.partOfSpeech,
        definitions: updateTranslateDto.definitions,
        examples: updateTranslateDto.examples,
        case: updateTranslateDto.case,
        timestamp: new Date(),
      },
      create: {
        original: updateTranslateDto.original,
        translation: updateTranslateDto.translation,
        partOfSpeech: updateTranslateDto.partOfSpeech,
        definitions: updateTranslateDto.definitions,
        examples: updateTranslateDto.examples,
        case: updateTranslateDto.case,
        tag: updateTranslateDto.tag,
        usersId: updateTranslateDto.usersId,
        timestamp: new Date(),
      },
    });
    return word;
  }

  async searchAhead(ahead: AheadDto) {
    const list = await this.prisma.words.findMany({
      where: {
        original: {
          startsWith: ahead.ahead,
        },
      },
      select: { original: true, id: true },
    });
    return list;
  }

  // async scrape(word: CreateTranslateDto): Promise<object> {
  //   console.log(word);
  //   const endpoint = 'https://en.wiktionary.org/api/rest_v1/page/definition';
  //   const filter = new RegExp(
  //     '< *\\/? *[a-z]+ *( [a-z]+="[^<>"]+" *)* *\\/? *>',
  //     'ig',
  //   );
  //   const outArray: string[] = [];
  //   const exmpArray: string[] = [];
  //   const returnObj = {
  //     partOfSpeech: '',
  //     definitions: outArray,
  //     examples: exmpArray,
  //   };
  //   const url = `${endpoint}/${word.text}`;
  //   let tag: string = 'uk';
  //   if (word.tag) tag = word.tag;

  //   try {
  //     await firstValueFrom(this.http.get(url)).then((d) => {
  //       const { data } = d;

  //       function cleanString(str) {
  //         return str.replaceAll(filter, '').replaceAll('&nbsp;', ' ');
  //       }

  //       for (const meaning of data[tag]) {
  //         returnObj.partOfSpeech = meaning.partOfSpeech;
  //         for (const definition of meaning.definitions) {
  //           if (definition.definition) {
  //             const bob = definition.definition as string;
  //             if (bob.includes('abbr title="perfective aspect"') === true)
  //               console.log('perfect!!');
  //             if (bob.includes('abbr title="imperfective aspect"') === true)
  //               console.log('imperfect!!');
  //             const filteredDefinition = cleanString(definition.definition);
  //             outArray.push(filteredDefinition as string);
  //             if (definition.examples) {
  //               for (const example of definition.examples) {
  //                 const filteredExample = cleanString(example);
  //                 exmpArray.push(filteredExample as string);
  //               }
  //             }
  //           }
  //         }

  //         return returnObj;
  //       }
  //     });
  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   } catch (e) {
  //     console.log('you had err');
  //     const gey = this.google.gService2(word);
  //     const hoo = await gey;
  //     if (hoo) returnObj.definitions.push(hoo);
  //   }

  //   return returnObj;
  // }
  // async scrape(word: CreateTranslateDto): Promise<object> {
  //   console.log(word);
  //   const endpoint = 'https://en.wiktionary.org/api/rest_v1/page/definition';
  //   const filter = new RegExp(
  //     '< *\\/? *[a-z]+ *( [a-z]+="[^<>"]+" *)* *\\/? *>',
  //     'ig',
  //   );
  //   const outArray: string[] = [];
  //   const exmpArray: string[] = [];
  //   const returnObj = {
  //     partOfSpeech: '',
  //     definitions: outArray,
  //     examples: exmpArray,
  //   };
  //   const url = `${endpoint}/${word.text}`;
  //   let tag: string = 'uk';
  //   if (word.tag) tag = word.tag;
  //   console.log(tag);
  //   await firstValueFrom(this.http.get(url)).then((d) => {
  //     const { data } = d;

  //     function cleanString(str) {
  //       return str.replaceAll(filter, '').replaceAll('&nbsp;', ' ');
  //     }

  //     for (const meaning of data[tag]) {
  //       returnObj.partOfSpeech = meaning.partOfSpeech;
  //       for (const definition of meaning.definitions) {
  //         if (definition.definition) {
  //           const bob = definition.definition as string;
  //           if (bob.includes('abbr title="perfective aspect"') === true)
  //             console.log('perfect!!');
  //           if (bob.includes('abbr title="imperfective aspect"') === true)
  //             console.log('imperfect!!');
  //           const filteredDefinition = cleanString(definition.definition);
  //           outArray.push(filteredDefinition as string);
  //           if (definition.examples) {
  //             for (const example of definition.examples) {
  //               const filteredExample = cleanString(example);
  //               exmpArray.push(filteredExample as string);
  //             }
  //           }
  //         }
  //       }

  //       console.log(returnObj);
  //       return returnObj;
  //     }
  //   });
  //   return returnObj;
  // }
}
