import {
  Controller,
  Get,
  // Post,
  Body,
  // Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GTranslateService } from './g-translate.service';
// import { CreateGTranslateDto } from './dto/create-g-translate.dto';
// import { UpdateGTranslateDto } from './dto/update-g-translate.dto';

@Controller('g-translate')
export class GTranslateController {
  constructor(private readonly gTranslateService: GTranslateService) {}

  // @Post()
  // create(@Body() createGTranslateDto: CreateGTranslateDto) {
  //   return this.gTranslateService.create(createGTranslateDto);
  // }

  @Get()
  findAll() {
    return this.gTranslateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gTranslateService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateGTranslateDto: UpdateGTranslateDto) {
  //   return this.gTranslateService.update(+id, updateGTranslateDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gTranslateService.remove(+id);
  }
}
