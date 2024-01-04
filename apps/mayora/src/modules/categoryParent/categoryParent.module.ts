import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryParentController } from './categoryParent.controller';
import { CategoryParentService } from './categoryParent.service';
import { CategoryParentModel } from './categoryParent.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([CategoryParentModel]),
  ],
  controllers: [CategoryParentController],
  providers: [CategoryParentService],
  exports: [CategoryParentService],
})
export class CategoryParentModule {}
