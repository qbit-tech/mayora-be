import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from '../user/user.entity';
import { AuthSessionService } from './authUser.service';
import { RoleModule } from '@qbit-tech/libs-role';
import { SessionService } from '@qbit-tech/libs-authv3';

@Module({
  imports: [RoleModule, SequelizeModule.forFeature([UserModel])],
  providers: [AuthSessionService, SessionService],
  controllers: [],
  exports: [AuthSessionService,SessionService],
})
export class AuthSessionModule {}
