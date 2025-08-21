/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
    private readonly httpService: HttpService,
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
      this.httpService.post(url, datar, options).pipe(),
    );
    const returnObject: res = { data: data, result: data.result };
    const { text } = word;
    console.log(returnObject.result);
    const forBack = {
      original: text,
      translation: returnObject.result,
    };
    const horse = await this.createComment(forBack);
    return horse;
  }

  createComment(createCommentDto: CreateDoubleDto) {
    const translateSubmission = this.prisma.words.create({
      data: {
        original: createCommentDto.original,
        translation: createCommentDto.translation,
      },
    });
    return translateSubmission;
  }
}
