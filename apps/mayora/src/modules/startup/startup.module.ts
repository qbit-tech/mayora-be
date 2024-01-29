import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { StartupController } from './startup.controller';
import { StartupService } from './startup.service';
import { StartupModel } from './startup.entity';
import { AuthSessionModule } from '../authUser/authUser.module';
import { SessionModule } from '@qbit-tech/libs-session';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthSessionModule,
    SessionModule,
    SequelizeModule.forFeature([StartupModel]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.ENV_PATH,
    }),
  ],
  controllers: [StartupController],
  providers: [StartupService],
  exports: [StartupService],
})
export class StartupModule { }
