import {
  Body,
  Controller,
  Get,
  HttpException,
  Logger,
  Param,
  Patch,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import {
  AppConfigApiContract,
  AppConfigBulkUpdateRequest,
  AppConfigUpdateRequest,
  FindAllConfigRequest,
  FindAllConfigResponse,
} from './appConfig.contract';
import { v4 as uuidv4 } from 'uuid';
import { AppRequest } from '@qbit/appContract/app.contract';
import { UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { getAllAdminRoles } from 'libs/utils/role';
import { AppConfigService } from 'libs/appConfig/src/appConfig/appConfig.service';
import { AuthPermissionGuard } from '../../core/auth.guard';
import { ERoles } from '../../core/roles';
import { getErrorStatusCode } from 'libs/utils/error';
import { AppConfigProperties } from 'libs/appConfig/src/appConfig/appConfig.entity';
import { convertDataToArray } from 'libs/utils/typeChecker';
import { AppConfigChangesLogsService } from 'libs/appConfig/src/appConfig/appConfigChangesLogs.service';

@ApiTags('Config')
@Controller('app-configs')
export class AppConfigController implements AppConfigApiContract {
  constructor(
    private readonly configService: AppConfigService,
    private readonly configChangeLogsService: AppConfigChangesLogsService,
  ) {}

  @Get()
  async findAll(
    @Query() query: FindAllConfigRequest,
  ): Promise<FindAllConfigResponse> {
    try {
      Logger.log('--ENTER FIND ALL, APP CONFIG CONTROLLER--');
      Logger.log(
        `file exist: ` + JSON.stringify(query),
        'appConfig.controller',
      );
      const res = await this.configService.findAll({
        ...query,
        keys: convertDataToArray(query.keys),
      });

      return res;
    } catch (err) {
      throw new HttpException(err, getErrorStatusCode(err));
    }
  }

  @Get(':key')
  async findByKey(@Param('key') key: string): Promise<AppConfigProperties> {
    try {
      Logger.log('--ENTER FIND BY KEY, APP CONFIG CONTROLLER--');
      Logger.log(`file exist: ` + JSON.stringify(key), 'appConfig.controller');
      const res = await this.configService.findByKey(key);

      const resHTML = `<head>
        <title>${res.vKey}</title>
        <style>
          body {
            font-size: 12pt;
          }
        </style>
      </head>

      <body>
      ${res.vValue}
      </body>`;

      return { ...res, html: resHTML };
    } catch (err) {
      throw new HttpException(err, getErrorStatusCode(err));
    }
  }

  // @ApiBearerAuth()
  @Patch(':key')
  // @UseGuards(AuthPermissionGuard(getAllAdminRoles(ERoles)))
  async update(
    @Param('key') key: string,
    @Body() params: AppConfigUpdateRequest,
  ): Promise<AppConfigProperties> {
    try {
      Logger.log('--ENTER UPDATE, APP CONFIG CONTROLLER--');
      Logger.log(
        `file ${key} updated: ` + JSON.stringify(params),
        'appConfig.controller',
      );
      const res = await this.configService.update({
        vKey: key,
        vValue: params.value,
      });

      // const updateHistory = await this.configChangeLogsService.create({
      //   vKey: key,
      //   iHistory: uuidv4(),
      //   jNewData: res,
      // });

      return res;
    } catch (err) {
      throw new HttpException(err, getErrorStatusCode(err));
    }
  }

  // @ApiBearerAuth()
  @Put('custom/bulk')
  // @UseGuards(AuthPermissionGuard(getAllAdminRoles(ERoles)))
  async bulkUpdate(
    @Body() body: AppConfigBulkUpdateRequest,
  ): Promise<AppConfigProperties[]> {
    try {
      Logger.log('--ENTER BULK UPDATE, APP CONFIG CONTROLLER--');
      Logger.log(
        `file bulk updated: ` + JSON.stringify(body),
        'appConfig.controller',
      );
      const res = await this.configService.bulkUpdate(body.bulk);

      const bulkUpdateHistory = await this.configChangeLogsService.bulkCreate(
        body.bulk,
      );

      return res;
    } catch (err) {
      throw new HttpException(err, getErrorStatusCode(err));
    }
  }

  // by object
  @Get('custom/as-object')
  async findAllAsObject(@Query() query: FindAllConfigRequest): Promise<any> {
    try {
      Logger.log('--ENTER FIND ALL AS OBJECT, APP CONFIG CONTROLLER--');
      Logger.log(
        `file exist: ` + JSON.stringify(query),
        'appConfig.controller',
      );
      const res = await this.configService.findAll({
        ...query,
        keys: convertDataToArray(query.keys),
      });

      const resObject = {};
      for (const result of res.results) {
        resObject[result.vKey] = result.vValue;
      }

      return resObject;
    } catch (err) {
      throw new HttpException(err, getErrorStatusCode(err));
    }
  }

  // @ApiBearerAuth()
  @Put('custom/as-object')
  // @UseGuards(AuthPermissionGuard(getAllAdminRoles(ERoles)))
  async bulkUpdateByObject(@Body() body: any): Promise<any> {
    try {
      Logger.log('--ENTER BULK UPDATE BY OBJECT, APP CONFIG CONTROLLER--');
      Logger.log(
        `file updated: ` + JSON.stringify(body),
        'appConfig.controller',
      );
      const res = await this.configService.updateByObject(body);

      return res;
    } catch (err) {
      throw new HttpException(err, getErrorStatusCode(err));
    }
  }
}
