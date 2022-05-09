import { Test, TestingModule } from '@nestjs/testing';
import { MyassetsController } from './myassets.controller';
import { MyassetsService } from './myassets.service';

describe('MyassetsController', () => {
  let controller: MyassetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MyassetsController],
      providers: [MyassetsService],
    }).compile();

    controller = module.get<MyassetsController>(MyassetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
