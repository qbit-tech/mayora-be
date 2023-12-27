import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  PaginationResponse,
  DefaultFindAllRequest,
} from '@qbit/appContract/app.contract';
import { AppConfigChangesLogsProperties } from 'libs/appConfig/src/appConfig/appConfigChangesLogsentity';

export abstract class AppConfigChangesLogsApiContract {
  abstract findAll(
    query: FindAllConfigChangesLogsRequest,
  ): Promise<PaginationResponse>;
}

export class FindAllConfigChangesLogsRequest extends DefaultFindAllRequest {
  @ApiPropertyOptional({ description: 'KEY1, KEY2' })
  keys: string;
}

export class FindAllConfigChangesLogsResponse extends PaginationResponse {
  results: AppConfigChangesLogsProperties[];
}
