import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TroubleController } from './trouble.controller';
import { TroubleService } from './trouble.service';
import { TroubleModel } from './trouble.entity';
import { AuthSessionModule } from '../authUser/authUser.module';
import { SessionModule } from '@qbit-tech/libs-session';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthSessionModule,
    SessionModule,
    SequelizeModule.forFeature([TroubleModel]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.ENV_PATH,
    }),
  ],
  controllers: [TroubleController],
  providers: [TroubleService],
  exports: [TroubleService],
})
export class TroubleModule { }
