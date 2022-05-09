import { Test, TestingModule } from '@nestjs/testing';
import { TipPendukungController } from './tip-pendukung.controller';
import { TipPendukungService } from './tip-pendukung.service';

describe('TipPendukungController', () => {
  let controller: TipPendukungController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipPendukungController],
      providers: [TipPendukungService],
    }).compile();

    controller = module.get<TipPendukungController>(TipPendukungController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
