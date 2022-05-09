import { Test, TestingModule } from '@nestjs/testing';
import { TipPendukungService } from './tip-pendukung.service';

describe('TipPendukungService', () => {
  let service: TipPendukungService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipPendukungService],
    }).compile();

    service = module.get<TipPendukungService>(TipPendukungService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
