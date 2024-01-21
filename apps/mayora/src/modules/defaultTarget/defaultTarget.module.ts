import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DefaultTargetController } from './defaultTarget.controller';
import { DefaultTargetModel } from './defaultTarget.entity';
import { defaultTargetService } from './defaultTarget.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    SequelizeModule.forFeature([DefaultTargetModel, DefaultTargetModel]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.ENV_PATH,
    }),
  ],
  controllers: [DefaultTargetController],
  providers: [defaultTargetService],
})
export class DefaultTargetModule { }
