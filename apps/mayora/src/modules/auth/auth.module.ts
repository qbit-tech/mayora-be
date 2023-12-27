import { forwardRef, Module } from '@nestjs/common';
// import { GoSMSGatewayModule } from "libs/goSMSgateway/src";
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { EmailAuthService } from './email.auth.service';
import { PhoneAuthModule } from './phone/phone.auth.module';
import { PhoneController } from './phone/phone.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { OTPModel } from './otp.repositories';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => PhoneAuthModule),
    SequelizeModule.forFeature([OTPModel]),
  ],
  controllers: [AuthController, PhoneController],
  providers: [AuthService, EmailAuthService],
  exports: [AuthService, EmailAuthService],
})
export class AuthModule {}
