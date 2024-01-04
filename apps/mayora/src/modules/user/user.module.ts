import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserService } from './user.service';
import { UserModel } from './user.entity';
import { UserController } from './user.controller';
import { RoleModel, RoleService } from '@qbit-tech/libs-role';
import { ConfigModule } from '@nestjs/config';
import { AuthSessionModule } from '../authUser/authUser.module';
import { MulterModule } from '@nestjs/platform-express';
import { SessionModule } from '@qbit-tech/libs-session';
import * as MulterS3 from 'multer-s3';
import { Endpoint, S3 } from 'aws-sdk';
import multer = require('multer');
import path = require('path');

@Module({
  imports: [
    AuthSessionModule,
    SessionModule,
    SequelizeModule.forFeature([UserModel, RoleModel]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.ENV_PATH,
    }),
  ],
  providers: [UserService, RoleService],
  controllers: [UserController],
  exports: [UserService, RoleService],
})
export class UserModule {}
