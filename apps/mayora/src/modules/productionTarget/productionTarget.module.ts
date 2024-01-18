import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductionTargetController } from './productionTarget.controller';
import { ProductionTargetModel } from './productionTarget.entity';
import { ProductionTargetService } from './productionTarget.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    SequelizeModule.forFeature([ProductionTargetModel, ProductionTargetModel]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.ENV_PATH,
    }),
  ],
  controllers: [ProductionTargetController],
  providers: [ProductionTargetService],
})
export class ProductionTargetModule { }
