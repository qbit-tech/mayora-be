import { Module } from '@nestjs/common';
import { ReadmeController } from './readme.controller';
import { ReadmeService } from './readme.service';

@Module({
  imports: [],
  controllers: [ReadmeController],
  providers: [ReadmeService],
})
export class ReadmeModule {}
