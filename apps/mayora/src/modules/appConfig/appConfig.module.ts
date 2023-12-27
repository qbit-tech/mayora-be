import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppConfigModel } from 'libs/appConfig/src/appConfig/appConfig.entity';
import { AppConfigService } from 'libs/appConfig/src/appConfig/appConfig.service';
import { AuthModule } from '../auth/auth.module';
import { AppConfigController } from './appConfig.controller';
import { AppConfigChangesLogsService } from 'libs/appConfig/src/appConfig/appConfigChangesLogs.service';
import { AppConfigChangesLogsModel } from 'libs/appConfig/src/appConfig/appConfigChangesLogsentity';

@Module({
  imports: [
    SequelizeModule.forFeature([
      AppConfigModel, AppConfigChangesLogsModel
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [
    AppConfigController,
  ],
  providers: [AppConfigService, AppConfigChangesLogsService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
