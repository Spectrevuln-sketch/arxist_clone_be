import { Test, TestingModule } from '@nestjs/testing';
import { CommistionService } from './commistion.service';

describe('CommistionService', () => {
  let service: CommistionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommistionService],
    }).compile();

    service = module.get<CommistionService>(CommistionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
