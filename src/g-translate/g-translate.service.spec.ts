import { Test, TestingModule } from '@nestjs/testing';
import { GTranslateService } from './g-translate.service';

describe('GTranslateService', () => {
  let service: GTranslateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GTranslateService],
    }).compile();

    service = module.get<GTranslateService>(GTranslateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
