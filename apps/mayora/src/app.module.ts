import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { RedisModule, RedisModuleOptions } from '@nestjs-modules/ioredis';
import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
// import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { NotificationModule } from '@qbit-tech/libs-notification';
import { AuthenticationModule } from '@qbit-tech/libs-authv3';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { PermissionModule } from './modules/permission/permission.module';
import { RoleModule } from '@qbit-tech/libs-role';

import { SessionModule } from '@qbit-tech/libs-session';
import { NotificationScheduleModule } from '@qbit-tech/libs-notification-scheduler';
import { InitDataModule } from './modules/initData/initData.module';
import { CategoryModule } from './modules/category/category.module';
import { CategoryParentModule } from './modules/categoryParent/categoryParent.module';
import { ManualCollectionModule } from './modules/manualCollection/manualCollection.module';
import { ReleaseModule } from './modules/release/release.module';
import { TroubleModule } from './modules/trouble/trouble.module';
import { MachineModule } from './modules/machine/machine.module';
import { UserDetailModule } from './modules/userDetail/userDetail.module';
import { ProductionTargetModule } from './modules/productionTarget/productionTarget.module';
import { OeeTargetModule } from './modules/oeeTarget/oeeTarget.module';
import { DefaultTargetModule } from './modules/defaultTarget/defaultTarget.module';
import { StartupModule } from './modules/startup/startup.module';
import { StatusMachineModule } from './modules/statusMachine/statusMachine.module';

const notificationOptions = [
  {
    name: 'sendinblue' as any,
    setting: {
      apiKey: process.env.SENDINBLUE_API_KEY || '-',
      from: {
        email: process.env.SENDINBLUE_EMAIL_FROM,
        name: process.env.SENDINBLUE_EMAIL_FROM_NAME,
      },
    },
  },
  {
    name: 'brevo' as any,
    setting: {
      apiKey: process.env.BREVO_API_KEY || '-',
      from: {
        email: process.env.BREVO_EMAIL_FROM,
        name: process.env.BREVO_EMAIL_FROM_NAME,
      },
    },
  },
  {
    name: 'nodemailer' as any,
    setting: {
      apiKey: process.env.NODEMAILER_API_KEY || '-',
      from: {
        email: process.env.NODEMAILER_EMAIL_FROM,
        name: process.env.NODEMAILER_EMAIL_FROM_NAME,
      },
      nodemailer: {
        username: process.env.NODEMAILER_USERNAME,
        password: process.env.NODEMAILER_PASSWORD,
        service: process.env.NODEMAILER_SERVICE,
        host: process.env.NODEMAILER_SMTP_HOST,
        port: process.env.NODEMAILER_SMTP_PORT,
        secure: process.env.NODEMAILER_SMTP_SECURE,
      },
    },
  },
  {
    name: 'goSMSGateway' as any,
    setting: {
      apiKey: process.env.NODE_ENV,
      goSmsGateway: {
        username: process.env.GOSMSGATEWAY_USERNAME,
        password: process.env.GOSMSGATEWAY_PASSWORD,
      },
    },
  },
];

const sessionOption = {
  sessionHashToken: process.env.SESSION_HASH_TOKEN,
  randomSessionIdKey: process.env.RANDOM_SESSIONID_KEY,
  projectId: process.env.PROJECT_ID,
  expiredJWTTokenAccessInMinutes: parseInt(
    process.env.EXPIRED_JWT_TOKEN_ACCESS_IN_MINUTES,
  ),
  expiredJWTTokenRefreshInMinutes: parseInt(
    process.env.EXPIRED_JWT_TOKEN_REFRESH_IN_MINUTES,
  ),
};

const redisOption: RedisModuleOptions = {
  config: {
    url: process.env.REDIS_URL,
  },
};

export const rootImportedModules = [
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: process.env.ENV_PATH,
  }),
  RedisModule.forRoot(redisOption),
  SequelizeModule.forRoot({
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || '123456',
    database: process.env.DB_NAME || 'mayora',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    // dialectOptions: {
    //   statement_timeout: 600000
    // },
    dialect: 'postgres',
    autoLoadModels: true,
    logging: false,
    synchronize: false,
  }),
  NotificationModule.forRoot(notificationOptions),
  AuthenticationModule.forRoot(
    [
      {
        name: 'email',
        setting: {},
      },
      {
        name: 'apple',
        setting: {
          clientId: process.env.APPLE_CLIENT_ID,
        },
      },
      {
        name: 'google',
        setting: {
          appId: '833872597745-4pbbes9c7vpsn52v4gp34ktfog92udvr.apps.googleusercontent.com',
          appSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
      },
      // {
      //   name: 'fb',
      //   setting: {
      //     appId: process.env.FACEBOOK_CLIENT_ID,
      //     appSecret: process.env.FACEBOOK_CLIENT_SECRET,
      //     baseUrl: process.env.FACEBOOK_BASE_URL,
      //   },
      // },
      {
        name: 'phone',
        setting: {},
      },
    ],
    notificationOptions,
  ),
  SessionModule.forRoot(sessionOption, redisOption),
  NotificationScheduleModule.forRoot(sessionOption, redisOption),
];
@Module({
  imports: [
    ...rootImportedModules,
    AuthModule,
    UserModule,
    PermissionModule,
    RoleModule,
    InitDataModule,
    CategoryModule,
    CategoryParentModule,
    ManualCollectionModule,
    ReleaseModule,
    TroubleModule,
    MachineModule,
    UserDetailModule,
    ProductionTargetModule,
    OeeTargetModule,
    DefaultTargetModule,
    StartupModule,
    StatusMachineModule
  ],
  controllers: [AppController],
})
export class AppModule { }
