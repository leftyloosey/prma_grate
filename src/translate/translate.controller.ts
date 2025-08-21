/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { TranslateService } from './translate.service';
import { CreateTranslateDto } from './dto/create-translate.dto';
// import { UpdateTranslateDto } from './dto/update-translate.dto';

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

  @Post()
  // submitWord(@Body() word) {
  submitWord(@Body() createTranslateDto: CreateTranslateDto) {
    return this.translateService.submitWord(createTranslateDto);
    // return this.translateService.submitWord(createTranslateDto);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.translateService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTranslateDto: UpdateTranslateDto) {
  //   return this.translateService.update(+id, updateTranslateDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.translateService.remove(+id);
  // }
}
