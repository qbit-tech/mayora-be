import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppConfigModule } from './modules/appConfig/appConfig.module';
import { AppConfigChangesLogsModule } from './modules/appConfig/appConfigChangesLogs.module';
import { CategoryModule } from './modules/category/category.module';

const notificationOptions = [
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

export const rootImportedModules = [
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: process.env.ENV_PATH,
  }),
  // RedisModule.forRoot({
  //   config: {
  //     url: process.env.REDIS_URL,
  //   },
  // }),
  SequelizeModule.forRoot({
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'inne1349',
    database: process.env.DB_NAME || 'mayora',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    define: {
      timestamps: false,
    },
    dialect: 'postgres',
    autoLoadModels: true,
    logging: true,
    synchronize: false,
  }),
  // NotificationsModules.NotificationModule.forRoot(notificationOptions),
  // FirebaseModule.forRoot({
  //   credential: process.env.FIREBASE_CERT
  //     ? FirebaseAdmin.credential.cert(process.env.FIREBASE_CERT)
  //     : FirebaseAdmin.credential.applicationDefault(),
  // }),
];

@Module({
  imports: [
    ...rootImportedModules,
    CategoryModule
    // NotificationsModules.NotificationModule
  ],
  controllers: [AppController],
})
export class AppModule {}
