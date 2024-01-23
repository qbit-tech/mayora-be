import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DefaultTargetController } from './defaultTarget.controller';
import { DefaultTargetModel } from './defaultTarget.entity';
import { defaultTargetService } from './defaultTarget.service';
import { ConfigModule } from '@nestjs/config';
import { DefaultTargetModelLog } from './defaultTargetLog.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([DefaultTargetModel, DefaultTargetModel]),
    SequelizeModule.forFeature([DefaultTargetModelLog, DefaultTargetModelLog]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.ENV_PATH,
    }),
  ],
  controllers: [DefaultTargetController],
  providers: [defaultTargetService],
})
export class DefaultTargetModule { }
