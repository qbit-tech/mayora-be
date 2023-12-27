import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from '../../user/user.module';
import { AuthModule } from '../auth.module';
import { OTPModel } from '../otp.repositories';
import { PhoneAuthService } from './phone.auth.service';
// import { GoSMSGatewayModule } from "libs/goSMSgateway/src";

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    SequelizeModule.forFeature([OTPModel]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.ENV_PATH,
    }),
  ],
  controllers: [],
  providers: [PhoneAuthService],
  exports: [PhoneAuthService],
})
export class PhoneAuthModule {}
