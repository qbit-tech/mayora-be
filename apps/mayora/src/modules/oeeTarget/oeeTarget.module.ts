import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OeeTargetController } from './oeeTarget.controller';
import { OEETargetModel } from './oeeTarget.entity';
import { oeeTargetService } from './oeeTarget.service';
import { ConfigModule } from '@nestjs/config';
import { OEETargetLogModel } from './oeeTargetLog.entity';
import { UserModel } from '../user/user.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([OEETargetModel, UserModel]),
    SequelizeModule.forFeature([OEETargetLogModel]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.ENV_PATH,
    }),
  ],
  controllers: [OeeTargetController],
  providers: [oeeTargetService],
})
export class OeeTargetModule { }
