import { Test, TestingModule } from '@nestjs/testing';
import { CommistionController } from './commistion.controller';
import { CommistionService } from './commistion.service';

describe('CommistionController', () => {
  let controller: CommistionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommistionController],
      providers: [CommistionService],
    }).compile();

    controller = module.get<CommistionController>(CommistionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
