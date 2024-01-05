import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryParentController } from './categoryParent.controller';
import { CategoryParentService } from './categoryParent.service';
import { CategoryParentModel } from './categoryParent.entity';
import { AuthSessionModule } from '../authUser/authUser.module';
import { SessionModule } from '@qbit-tech/libs-session';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthSessionModule,
    SessionModule,
    SequelizeModule.forFeature([CategoryParentModel]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.ENV_PATH,
    }),
  ],
  controllers: [CategoryParentController],
  providers: [CategoryParentService],
  exports: [CategoryParentService],
})
export class CategoryParentModule { }
