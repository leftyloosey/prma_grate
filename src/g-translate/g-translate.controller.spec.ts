import { Test, TestingModule } from '@nestjs/testing';
import { GTranslateController } from './g-translate.controller';
import { GTranslateService } from './g-translate.service';

describe('GTranslateController', () => {
  let controller: GTranslateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GTranslateController],
      providers: [GTranslateService],
    }).compile();

    controller = module.get<GTranslateController>(GTranslateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
