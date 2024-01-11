import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReleaseController } from './release.controller';
import { ReleaseModel } from './release.entity';
import { ReleaseService } from './release.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    SequelizeModule.forFeature([ReleaseModel, ReleaseModel]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.ENV_PATH,
    }),
  ],
  controllers: [ReleaseController],
  providers: [ReleaseService],
})
export class ReleaseModule { }
