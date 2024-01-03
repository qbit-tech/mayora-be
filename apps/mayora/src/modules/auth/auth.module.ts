import { forwardRef, Module } from '@nestjs/common';
// import { GoSMSGatewayModule } from "libs/goSMSgateway/src";
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EmailAuthService } from './email.auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserService } from '../user/user.service';
import { UserModel } from '../user/user.entity';


@Module({
  imports: [
    SequelizeModule.forFeature([UserModel]),  
  ],
  controllers: [AuthController],
  providers: [AuthService, EmailAuthService, UserService],
  exports: [AuthService, EmailAuthService, UserService],
})
export class AuthModule {}
