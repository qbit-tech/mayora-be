import { Test, TestingModule } from '@nestjs/testing';
import { ReadmeController } from './readme.controller';
import { ReadmeService } from './readme.service';

describe('ReadmeController', () => {
  let readmeController: ReadmeController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ReadmeController],
      providers: [ReadmeService],
    }).compile();

    readmeController = app.get<ReadmeController>(ReadmeController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(readmeController.getHello()).toBe('Hello World!');
    });
  });
});
