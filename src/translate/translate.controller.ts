import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
} from '@nestjs/common';
import { TranslateService } from './translate.service';
import {
  AheadDto,
  CreateTranslateDto,
  LangTagDto,
  OffsetDto,
} from './dto/create-translate.dto';
// import { CreateDoubleDto } from './dto/create-translate.dto';
import { UpdateTranslateDto } from './dto/update-translate.dto';
import { ScraperService } from './scraper/scraper.service';

@Controller('translate')
export class TranslateController {
  constructor(
    private readonly translateService: TranslateService,
    private readonly scraper: ScraperService,
  ) {}

  @Get()
  getAllWords() {
    return this.translateService.getAllWords();
  }

  @Post('/wordsbytag')
  getWordsByLanguageTag(@Body() tag: LangTagDto) {
    return this.translateService.getWordsByLanguageTag(tag);
  }

  @Post('/nextoffset')
  getNextFiftyWords(@Body() page: OffsetDto) {
    return this.translateService.getFiftyOffset(page);
  }

  @Post('/upsert')
  upsertWord(@Body() upsertDoubleDto: UpdateTranslateDto) {
    return this.translateService.upsertWord(upsertDoubleDto);
  }
  @Post('/scrape')
  submitScrape(@Body() createTranslateDto: CreateTranslateDto) {
    return this.scraper.scrape(createTranslateDto);
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
    return this.translateService.updateWord(updateTranslateDto, id);
  }

  @Post('/ahead')
  searchAhead(@Body() ahead: AheadDto) {
    return this.translateService.searchAhead(ahead);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.translateService.deleteWordById(id);
  }
  // @Post('/nextfifty')
  // getNextFiftyWords(@Body() cursor: CursorDto) {
  //   return this.translateService.getNextFiftyWords(cursor);
  // }

  // @Post('/save')
  // submitWord(@Body() createDoubleDto: CreateDoubleDto) {
  //   return this.translateService.createLocalTranslation(createDoubleDto);
  // }
}
