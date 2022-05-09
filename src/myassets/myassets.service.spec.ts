import { Test, TestingModule } from '@nestjs/testing';
import { MyassetsService } from './myassets.service';

describe('MyassetsService', () => {
  let service: MyassetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyassetsService],
    }).compile();

    service = module.get<MyassetsService>(MyassetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
