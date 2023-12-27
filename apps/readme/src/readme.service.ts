import { Injectable } from '@nestjs/common';

@Injectable()
export class ReadmeService {
  getHello(): string {
    return 'Hello World!';
  }
}
