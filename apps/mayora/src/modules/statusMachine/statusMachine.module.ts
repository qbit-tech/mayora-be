import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { StatusMachineController } from './statusMachine.controller';
import { StatusMachineService } from './statusMachine.service';
import { StatusMachineModel } from './statusMachine.entity';
import { AuthSessionModule } from '../authUser/authUser.module';
import { SessionModule } from '@qbit-tech/libs-session';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthSessionModule,
    SessionModule,
    SequelizeModule.forFeature([StatusMachineModel]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.ENV_PATH,
    }),
  ],
  controllers: [StatusMachineController],
  providers: [StatusMachineService],
  exports: [StatusMachineService],
})
export class StatusMachineModule { }
