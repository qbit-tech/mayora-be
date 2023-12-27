import { Module } from '@nestjs/common';
import { AppConfigChangesLogsController } from './appConfigChangesLogs.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppConfigChangesLogsModel } from 'libs/appConfig/src/appConfig/appConfigChangesLogsentity';
import { AuthModule } from '../auth/auth.module';
import { AppConfigChangesLogsService } from 'libs/appConfig/src/appConfig/appConfigChangesLogs.service';

@Module({
  imports: [
    SequelizeModule.forFeature([AppConfigChangesLogsModel]),
    AuthModule,
  ],
  controllers: [AppConfigChangesLogsController],
  providers: [AppConfigChangesLogsService],
  exports: [AppConfigChangesLogsService],
})
export class AppConfigChangesLogsModule {}
