/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { CreateTranslateDto } from 'src/translate/dto/create-translate.dto';
import * as translate from 'extended-google-translate-api';
import { gReturn } from './entities/g-translate.entity';
@Injectable()
export class GTranslateService {
  async gService2(word: CreateTranslateDto): Promise<gReturn> {
    const gReturn: gReturn = await translate(word.text, word.tag, word.target)
      .then((res: gReturn) => {
        return res;
      })
      .catch(console.log);
    return gReturn;
  }
}
