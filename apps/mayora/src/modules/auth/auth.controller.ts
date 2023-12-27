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
import { AuthGuard } from '../../core/auth.guard';
import { cleanPhoneNumber } from '../../utils/phoneNumber';
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
import { PhoneAuthService } from './phone/phone.auth.service';
import { Gender } from '../user/user.entity';

@ApiTags('Auth by Username')
@Controller('auth')
export class AuthController implements AuthApiContract {
  constructor(
    private readonly authService: AuthService,
    private readonly phoneService: PhoneAuthService,
  ) {}
  @Post('signin')
  async signIn(@Body() body: SignInRequest): Promise<SignInResponse> {
    try {
      const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
      let cleanedEmail = regexEmail.test(body.vEmail)

      const regexPhone = /^\d+$/g

      const cleanedPhoneNumber = cleanPhoneNumber(body.vMobile, '62');
      let cleanedPhone = regexPhone.test(cleanedPhoneNumber)
      Logger.log('INSIDE SIGNIN AUTH CONTROLLER');
      const signInResult = await this.authService.signIn({
        vEmail: cleanedEmail? body.vEmail : '',
        vMobile: cleanedPhone ? cleanPhoneNumber(body.vMobile, '62') : '',
        vPassword: body.vPassword,
        vMobileGUID: body.vMobileGUID,
        platform: 'mobile',
      });

      Logger.log(JSON.stringify(signInResult));

      if (signInResult === null) {
        throw new HttpException(
          {
            code: 401,
            message: 'Credentials Incorrect',
          },
          HttpStatus.UNAUTHORIZED,
        );
      } else if (signInResult.tempSession === 'SUSPICIOUS') {
        Logger.log('MASUK ELSE IF');
        throw new HttpException(
          {
            code: 401,
            message: signInResult.status,
          },
          HttpStatus.UNAUTHORIZED,
        );
      }

      return signInResult;
    } catch (err) {
      Logger.error(err);
      throw new HttpException(err, getErrorStatusCode(err));
    }
  }

  @Post('refresh-token')
  async signInWithSession(
    @Body() body: AuthWithSessionRequest,
  ): Promise<{ token: string; expired: string; isSuccess: boolean }> {
    try {
      const result = await this.authService.sessionSignIn(
        body.token,
        body.vMobileGUID,
      );
      return result;
    } catch (err) {
      Logger.error(err);
      throw new HttpException(err, getErrorStatusCode(err));
    }
  }

  @Post('register')
  async register(@Body() req: RegisterRequest): Promise<RegisterResponse> {
    try {
      Logger.log('INSIDE REGISTER CONTROLLER');
      Logger.log(JSON.stringify(req));
      const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
      let cleanedEmail = regexEmail.test(req.vEmail)

      const regexPhone = /^\d+$/g

      const cleanedPhoneNumber = cleanPhoneNumber(req.vMobile, '62');
      let cleanedPhone = regexPhone.test(cleanedPhoneNumber)

      
      Logger.log('CLEANED PHONE NUMBER: ' + cleanedPhoneNumber);



      const username = req.vEmail ? req.vEmail : cleanedPhoneNumber;
      Logger.log('THE USERNAME IS ' + username);
      if(cleanedEmail || cleanedPhone){
        const registerResult = await this.authService.register({
          vFirstName: req.vFirstName,
          vLastName: req.vLastName,
          vEmail: req.vEmail,
          vMobile: cleanedPhoneNumber,
          vPassword: req.vPassword,
          vUsername: username,
          vNickName: req.vNickName,
          verifiedEmailSessionId: req.verifiedEmailSessionId,
          verifiedPhoneSessionId: req.verifiedPhoneSessionId,
          iGender: req.iGender,
          birthdate: req.birthdate,
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

  @ApiBearerAuth()
  @Post('signout')
  @UseGuards(AuthGuard())
  async signOut(@Request() req): Promise<SignOutResponse> {
    try {
      Logger.log(JSON.stringify(req.user));
      const accepted = await this.authService.signOut(
        req.user.sessionId,
        req.user.user,
      );
      if (!accepted.isSuccess) {
        return { isSuccess: false };
      } else {
        return { isSuccess: true };
      }
    } catch (err) {
      Logger.error(err);
      throw new HttpException(err, getErrorStatusCode(err));
    }
  }

  @Post('email/otp/send')
  async sendEmailOTP(
    @Body() body: ResendEmailVerificationRequest,
  ): Promise<EmailOTPResponse> {
    try {
      Logger.log('INSIDE SEND-EMAIL-VERIFICATION');
      const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
      let cleanedEmail = regexEmail.test(body.vEmail)
      if(cleanedEmail){
        const result = await this.authService.sendEmailOTP(
          body.vEmail,
          body.tempSession,
        );
        Logger.log(result);
        return { vEmail: body.vEmail, OTP: result };
      }
      throw new HttpException('Register Error', 500);
    } catch (err) {
      Logger.error(err);
      throw new HttpException(err, getErrorStatusCode(err));
    }
  }

  @Post('email/otp/resend')
  async resendEmailOTP(
    @Body() body: ResendEmailVerificationRequest,
  ): Promise<EmailOTPResponse> {
    try {
      Logger.log('INSIDE SEND-EMAIL-VERIFICATION');
      const result = await this.authService.resendEmailOTP(
        body.vEmail,
        body.tempSession,
      );
      Logger.log(result);
      return { vEmail: body.vEmail, OTP: result };
    } catch (err) {
      Logger.error(err);
      throw new HttpException(err, getErrorStatusCode(err));
    }
  }

  @Post('email/otp/verify')
  async verifyEmail(
    @Body() params: EmailVerificationRequest,
  ): Promise<EmailVerificationResponse> {
    try {
      Logger.log('Inside verify-email: ' + params.vEmail);
      const verified = await this.authService.verifyEmailToken(
        params.otp,
        params.vEmail,
      );
      if (verified != null) {
        return { isSuccess: true, sessionId: verified.token };
      }
      throw new HttpException(
        {
          code: 'err_bad_request',
          message: 'Invalid OTP',
        },
        HttpStatus.BAD_REQUEST,
      );
    } catch (err) {
      Logger.error(err);
      throw new HttpException(err, getErrorStatusCode(err));
    }
  }

  @Post('forgot-password')
  async forgotEmailPassword(
    @Body() params: ForgotEmailPassword,
  ): Promise<{ isSuccess: boolean; token: string }> {
    try {
      const sendEmail = await this.authService.sendForgotEmailPassword(
        params.vEmail,
      );
      return sendEmail
        ? { isSuccess: sendEmail.isSuccess, token: sendEmail.token }
        : { isSuccess: false, token: 'failed' };
      
    } catch (err) {
      Logger.error(err);
      throw new HttpException(err, getErrorStatusCode(err));
    }
  }

  @Post('change-password/by-otp')
  async changePassword(
    @Body() body: NewPasswordRequest,
  ): Promise<{ isSuccess: boolean }> {
    try {
      
      Logger.log('INSIDE CHANGE PASSWORD');
      const result = await this.authService.changeEmailPassword(
        body.vEmail,
        body.OTP,
        body.newPassword,
      );
      return { isSuccess: result };
    } catch (err) {
      Logger.error(err);
      throw new HttpException(err, getErrorStatusCode(err));
    }
  }

  @ApiBearerAuth()
  @Post('add/phone')
  @UseGuards(AuthGuard())
  async addphone(
    @Body() params: AddPhoneRequest,
  ): Promise<{ isSuccess: boolean; message: string }> {
    try {
      const cleanedPhoneNumber = cleanPhoneNumber(params.vMobile, '62');
      Logger.log('CLEANED PHONE NUMBER: ' + cleanedPhoneNumber);
      const phoneSendOTP = await this.phoneService.sendOtp(
        cleanedPhoneNumber,
        '',
      );
      if (phoneSendOTP != null) {
        return { isSuccess: true, message: 'Waiting for Phone 2FA' };
      } else return { isSuccess: false, message: 'Failed to add Phone' };
    } catch (err) {
      Logger.error(err);
      throw new HttpException(err, getErrorStatusCode(err));
    }
  }

  @ApiBearerAuth()
  @Post('add/phone/verify')
  @UseGuards(AuthGuard())
  async addphoneVerify(
    @Request() req,
    @Body() params: PhoneVerificationRequest,
  ): Promise<{ isSuccess: boolean; message: string }> {
    try {
      
      const cleanedPhoneNumber = cleanPhoneNumber(params.vMobile, '62');
      const verification = await this.phoneService.verifyOTP(
        cleanedPhoneNumber,
        params.otp,
      );
  
      if (verification.token != '') {
        await this.authService.updateUserPhone(req.user.user, cleanedPhoneNumber);
        return { isSuccess: true, message: 'Add Phone is successful' };
      } else return { isSuccess: false, message: 'Failed to assign Phone' };
    } catch (err) {
      Logger.error(err);
      throw new HttpException(err, getErrorStatusCode(err));
    }
  }

  @Get('check-validity')
  async checkValidity(
    @Query() params: ValidityCheckInput,
  ): Promise<ValidityCheckResponse> {
    try {
      
      const cleanedPhoneNumber = cleanPhoneNumber(params.vMobile, '62');
      const res: boolean[] = await this.authService.validityCheck(
        params.vUsername,
        params.vEmail,
        cleanedPhoneNumber,
      );
  
      const finalRes = {
        vMobile: false,
        vUsername: false,
        vEmail: false,
      };
  
      for (let i = 0; i < res.length; i++) {
        if (i == 0 && res[0] == true) {
          finalRes.vMobile = true;
        } else if (i == 1 && res[1] == true) {
          finalRes.vUsername = true;
        } else if (i == 2 && res[2] == true) {
          finalRes.vEmail = true;
        }
      }
      return finalRes;
    } catch (err) {
      Logger.error(err);
      throw new HttpException(err, getErrorStatusCode(err));
    }
  }
}
