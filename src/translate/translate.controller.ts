/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TranslateService } from './translate.service';
import {
  AheadDto,
  CreateTranslateDto,
  OffsetDto,
} from './dto/create-translate.dto';
import { CreateDoubleDto } from './dto/create-translate.dto';
import { UpdateTranslateDto } from './dto/update-translate.dto';

@Controller('translate')
export class TranslateController {
  constructor(private readonly translateService: TranslateService) {}

  // @Post()
  // create(@Body() createTranslateDto: CreateTranslateDto) {
  //   return this.translateService.create(createTranslateDto);
  // }

  @Get()
  getAllWords() {
    return this.translateService.getAllWords();
  }
  @Get('/firstfifty')
  getFirstFiftyWords() {
    return this.translateService.getFirstFiftyWords();
  }
  @Post('/nextoffset')
  getNextFiftyWords(@Body() page: OffsetDto) {
    return this.translateService.getFiftyOffset(page);
  }
  // @Post('/nextfifty')
  // getNextFiftyWords(@Body() cursor: CursorDto) {
  //   return this.translateService.getNextFiftyWords(cursor);
  // }

  @Post('/save')
  submitWord(@Body() createDoubleDto: CreateDoubleDto) {
    return this.translateService.createLocalTranslation(createDoubleDto);
  }
  @Post('/upsert')
  upsertWord(@Body() upsertDoubleDto: UpdateTranslateDto) {
    return this.translateService.upsert(upsertDoubleDto);
  }
  @Post('/scrape')
  submitScrape(@Body() createTranslateDto: CreateTranslateDto) {
    return this.translateService.scrape(createTranslateDto);
    // return this.translateService.submitWord(createTranslateDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.translateService.getWordById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTranslateDto: UpdateTranslateDto,
  ) {
    console.log(updateTranslateDto);
    return this.translateService.update(updateTranslateDto, id);
  }

  @Post('/ahead')
  searchAhead(@Body() ahead: AheadDto) {
    return this.translateService.searchAhead(ahead);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.translateService.remove(+id);
  // }
}
