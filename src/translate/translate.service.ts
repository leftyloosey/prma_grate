import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import {
  CreateDoubleDto,
  OffsetDto,
  AheadDto,
} from './dto/create-translate.dto';
import { PrismaService } from '../prisma.service';
import { UpdateTranslateDto } from './dto/update-translate.dto';
import { GTranslateService } from 'src/g-translate/g-translate.service';

@Injectable()
export class TranslateService {
  constructor(
    private readonly http: HttpService,
    private prisma: PrismaService,
    private google: GTranslateService,
  ) {}

  async getAllWords() {
    const all = await this.prisma.words.findMany();
    return all;
  }

  async getFiftyOffset(pageAndTag: OffsetDto) {
    const totalWords = await this.prisma.words.count();
    const { page } = pageAndTag;
    const { tag } = pageAndTag;

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
  }

  async getWordById(id: string) {
    const word = await this.prisma.words.findUnique({
      where: { id: id },
    });
    return word;
  }

  async createWord(createDoubleDto: CreateDoubleDto) {
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

  async updateWord(updateTranslateDto: UpdateTranslateDto, id: string) {
    const update = await this.prisma.words.update({
      where: {
        id: id,
      },
      data: updateTranslateDto,
    });
    return update;
  }

  async upsertWord(updateTranslateDto: UpdateTranslateDto) {
    if (!updateTranslateDto.id) {
      const word = await this.createWord(updateTranslateDto);
      return word;
    }

    const word = await this.prisma.words.upsert({
      where: {
        id: updateTranslateDto.id,
        // original: updateTranslateDto.original,
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

  async deleteWordById(id: string) {
    const word = await this.prisma.words.delete({
      where: { id: id },
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
}
