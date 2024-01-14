import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ManualCollectionController } from './manualCollection.controller';
import { ManualCollectionService } from './manualCollection.service';
import { ManualCollectionModel } from './manualCollection.entity';
import { AuthSessionModule } from '../authUser/authUser.module';
import { SessionModule } from '@qbit-tech/libs-session';
import { ConfigModule } from '@nestjs/config';
import { CategoryModel } from '../category/category.entity';
import { CategoryService } from '../category/category.service';
import { CategoryParentModel } from '../categoryParent/categoryParent.entity';
import { CategoryParentService } from '../categoryParent/categoryParent.service';
import { CategoryParentController } from '../categoryParent/categoryParent.controller';

@Module({
  imports: [
    AuthSessionModule,
    SessionModule,
    SequelizeModule.forFeature([ManualCollectionModel, CategoryModel, CategoryParentModel]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.ENV_PATH,
    }),
  ],
  controllers: [ManualCollectionController, CategoryParentController],
  providers: [ManualCollectionService, CategoryService, CategoryParentService],
  exports: [ManualCollectionService, CategoryService, CategoryParentService],
})
export class ManualCollectionModule { }
