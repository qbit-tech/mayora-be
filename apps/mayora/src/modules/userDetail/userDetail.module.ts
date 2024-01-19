import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthSessionModule } from '../authUser/authUser.module';
import { SessionModule } from '@qbit-tech/libs-session';
import { ConfigModule } from '@nestjs/config';
import { UserDetailModel } from './userDetail.entity';
import { UserDetailController } from './userDetail.controller';
import { UserDetailService } from './userDetail.service';


@Module({
  imports: [
    AuthSessionModule,
    SessionModule,
    SequelizeModule.forFeature([UserDetailModel]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.ENV_PATH,
    }),
  ],
  controllers: [UserDetailController],
  providers: [UserDetailService],
  exports: [UserDetailService],
})
export class UserDetailModule { }
