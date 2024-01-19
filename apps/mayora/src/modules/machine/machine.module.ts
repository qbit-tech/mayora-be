import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthSessionModule } from '../authUser/authUser.module';
import { SessionModule } from '@qbit-tech/libs-session';
import { ConfigModule } from '@nestjs/config';
import { MachineModel } from './machine.entity';
import { MachineController } from './machine.controller';
import { MachineService } from './machine.service';


@Module({
  imports: [
    AuthSessionModule,
    SessionModule,
    SequelizeModule.forFeature([MachineModel]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.ENV_PATH,
    }),
  ],
  controllers: [MachineController],
  providers: [MachineService],
  exports: [MachineService],
})
export class MachineModule { }
