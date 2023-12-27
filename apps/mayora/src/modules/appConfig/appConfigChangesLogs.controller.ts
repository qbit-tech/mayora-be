import { Controller, Get, HttpException, Logger, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppConfigChangesLogsService } from 'libs/appConfig/src/appConfig/appConfigChangesLogs.service';
import { getErrorStatusCode } from 'libs/utils/error';
import { convertDataToArray } from 'libs/utils/typeChecker';
import {
  FindAllConfigChangesLogsRequest,
  FindAllConfigChangesLogsResponse,
  AppConfigChangesLogsApiContract,
} from './appConfigChangesLogs.contract';

@ApiTags('Config')
@Controller('app-configs-history')
export class AppConfigChangesLogsController
  implements AppConfigChangesLogsApiContract {
  constructor(
    private readonly configChangeLogsService: AppConfigChangesLogsService,
  ) {}

  @Get()
  async findAll(
    @Query() query: FindAllConfigChangesLogsRequest,
  ): Promise<FindAllConfigChangesLogsResponse> {
    try {
      Logger.log(
        '--ENTER FIND ALL USER_BANK_ACCOUNT, APP CONFIG-CHANGES LOGS CONTROLLER--',
      );
      Logger.log(
        `file exist: ` + JSON.stringify(query),
        'appConfigChangesLogs.controller',
      );
      const res = await this.configChangeLogsService.findAll({
        ...query,
        keys: convertDataToArray(query.keys),
      });

      return res;
    } catch (err) {
      throw new HttpException(err, getErrorStatusCode(err));
    }
  }
}
