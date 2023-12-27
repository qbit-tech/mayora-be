import { Controller, Get } from '@nestjs/common';
import { ReadmeService } from './readme.service';

@Controller()
export class ReadmeController {
  constructor(private readonly readmeService: ReadmeService) {}

  @Get()
  getHello(): string {
    return this.readmeService.getHello();
  }
}
