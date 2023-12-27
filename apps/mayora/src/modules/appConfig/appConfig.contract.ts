import { IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  PaginationResponse,
  DefaultFindAllRequest,
} from '@qbit/appContract/app.contract';
import { AppRequest } from '@qbit/appContract/app.contract';
import { AppConfigProperties } from '../../../../../libs/appConfig/src/appConfig/appConfig.entity';

export abstract class AppConfigApiContract {
  abstract findAll(query: FindAllConfigRequest): Promise<PaginationResponse>;
  abstract findByKey(key: string): Promise<AppConfigProperties>;

  abstract update(
    key: string,
    params: AppConfigUpdateRequest,
    req: AppRequest,
  ): Promise<AppConfigProperties>;
}

export class FindAllConfigRequest extends DefaultFindAllRequest {
  @ApiPropertyOptional({ description: 'KEY1,KEY2' })
  keys: string;
}

export class FindAllConfigResponse extends PaginationResponse {
  results: AppConfigProperties[];
}

export class AppConfigUpdateRequest {
  @IsNotEmpty()
  @ApiProperty()
  readonly value: string;
}

export class AppConfigUpdateSingleDataRequest {
  @IsNotEmpty()
  @ApiProperty()
  readonly vKey: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly vValue: string;
}

export class AppConfigBulkUpdateRequest {
  @ApiProperty({ type: AppConfigBulkUpdateRequest, isArray: true })
  bulk: AppConfigUpdateSingleDataRequest[];
}
