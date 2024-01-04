import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ManualCollectionController } from './manualCollection.controller';
import { ManualCollectionService } from './manualCollection.service';
import { ManualCollectionModel } from './manualCollection.entity';
import { AuthSessionModule } from '../authUser/authUser.module';
import { SessionModule } from '@qbit-tech/libs-session';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthSessionModule,
    SessionModule,
    SequelizeModule.forFeature([ManualCollectionModel, ManualCollectionModel]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.ENV_PATH,
    }),
  ],
  controllers: [ManualCollectionController],
  providers: [ManualCollectionService],
  exports: [ManualCollectionService],
})
export class ManualCollectionModule { }
