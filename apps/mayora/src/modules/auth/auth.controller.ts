import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { getErrorStatusCode } from 'libs/utils/error';
// import { AuthGuard } from '../../core/auth.guard';
import { AuthService } from './auth.service';
import {
  AuthApiContract,
  EmailVerificationRequest,
  EmailVerificationResponse,
  RegisterRequest,
  RegisterResponse,
  SignInRequest,
  SignInResponse,
  SignOutResponse,
  PhoneVerificationRequest,
  ForgotEmailPassword,
  NewPasswordRequest,
  ResendEmailVerificationRequest,
  AuthWithSessionRequest,
  AddPhoneRequest,
  EmailOTPResponse,
  ValidityCheckInput,
  ValidityCheckResponse,
} from './contract/auth.contract';
import { NewUserRequest } from '../user/user.contract';

@ApiTags('Auth by Username')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}
  @Post('signin')
  async signIn(@Body() body: SignInRequest): Promise<{ token: string; expired: string; isSuccess: boolean }> {
    try {
      const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
      let cleanedEmail = regexEmail.test(body.email)

      const regexPhone = /^\d+$/g

      Logger.log('INSIDE SIGNIN AUTH CONTROLLER');
      const signInResult = await this.authService.signIn({
        email: cleanedEmail? body.email : '',
        password: body.password,
      });

      return signInResult;
    } catch (err) {
      Logger.error(err);
      throw new HttpException(err, getErrorStatusCode(err));
    }
  }


  @Post('register')
  async register(@Body() req: NewUserRequest): Promise<RegisterResponse> {
    try {
      Logger.log('INSIDE REGISTER CONTROLLER');
      Logger.log(JSON.stringify(req));
      const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
      let cleanedEmail = regexEmail.test(req.email)

      const regexPhone = /^\d+$/g

      if(cleanedEmail){
        const registerResult = await this.authService.register({
          name: req.name,
          email: req.email,
          identifier: req.identifier,
          password: req.password,
          status: req.status,
          roleId: req.roleId
        });
        if (registerResult !== null) return { isSuccess: true };
        else return { isSuccess: false };
      } else {
        throw new HttpException('Register Error', 500);
      }
    } catch (err) {
      Logger.error(err);
      throw new HttpException(err, getErrorStatusCode(err));
    }
  }

  // @ApiBearerAuth()
  // @Post('signout')
  // @UseGuards(AuthGuard())
  // async signOut(@Request() req): Promise<SignOutResponse> {
  //   try {
  //     Logger.log(JSON.stringify(req.user));
  //     const accepted = await this.authService.signOut(
  //       req.user.sessionId,
  //       req.user.user,
  //     );
  //     if (!accepted.isSuccess) {
  //       return { isSuccess: false };
  //     } else {
  //       return { isSuccess: true };
  //     }
  //   } catch (err) {
  //     Logger.error(err);
  //     throw new HttpException(err, getErrorStatusCode(err));
  //   }
  // }



  // @Post('forgot-password')
  // async forgotEmailPassword(
  //   @Body() params: ForgotEmailPassword,
  // ): Promise<{ isSuccess: boolean; token: string }> {
  //   try {
  //     const sendEmail = await this.authService.sendForgotEmailPassword(
  //       params.vEmail,
  //     );
  //     return sendEmail
  //       ? { isSuccess: sendEmail.isSuccess, token: sendEmail.token }
  //       : { isSuccess: false, token: 'failed' };
      
  //   } catch (err) {
  //     Logger.error(err);
  //     throw new HttpException(err, getErrorStatusCode(err));
  //   }
  // }

}
