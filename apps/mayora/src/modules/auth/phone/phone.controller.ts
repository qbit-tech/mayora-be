import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'apps/tm/src/core/auth.guard';
import { cleanPhoneNumber } from 'apps/tm/src/utils/phoneNumber';
import { AuthService } from '../auth.service';
import {
  AddEmailRequest,
  EmailVerificationRequest,
  ForgotPhonePassword,
  NewPasswordRequest,
  NewPhonePasswordRequest,
  PhoneAuthApiContract,
  PhoneOTPResponse,
  PhoneSignInRequest,
  PhoneVerificationRequest,
  PhoneVerificationResponse,
} from '../contract/auth.contract';
import { PhoneAuthService } from './phone.auth.service';

@ApiTags('Auth By Phone')
@Controller('auth')
export class PhoneController implements PhoneAuthApiContract {
  constructor(
    private readonly phoneService: PhoneAuthService,
    private readonly authService: AuthService,
  ) {}

  @Post('phone/otp/send')
  async sendOtp(@Body() body: PhoneSignInRequest): Promise<PhoneOTPResponse> {
    try {
      Logger.log('INSIDE SEND-PHONE-2FA');
      const regexPhone = /^\d+$/g
      const cleanedPhoneNumber = cleanPhoneNumber(body.vMobile, '62');
      let cleanedPhone = regexPhone.test(cleanedPhoneNumber)
      Logger.log('phoneNumber: ' + cleanPhoneNumber);
      Logger.log('tempSession: ' + body.tempSession);
      Logger.log('test: ', cleanedPhone)
      if(cleanedPhone){
        const result = await this.phoneService.sendOtp(
          cleanedPhoneNumber,
          body.tempSession,
        );
        return { vMobile: cleanedPhoneNumber, OTP: result };
      }
      throw new HttpException('Send Otp Error', 500);
    } catch (error) {
      Logger.error(error);
      throw new HttpException(error, 500);
    }
  }

  @Post('phone/otp/resend')
  async reSendOtp(@Body() body: PhoneSignInRequest): Promise<PhoneOTPResponse> {
    try {
      Logger.log('INSIDE SEND-PHONE-2FA');
      const cleanedPhoneNumber = cleanPhoneNumber(body.vMobile, '62');
      Logger.log('phoneNumber: ' + cleanPhoneNumber);
      Logger.log('tempSession: ' + body.tempSession);
      const result = await this.phoneService.reSendOtp(
        cleanedPhoneNumber,
        body.tempSession,
      );
      return { vMobile: cleanedPhoneNumber, OTP: result };
    } catch (error) {
      Logger.error(error);
      throw new HttpException(error, 500);
    }
  }

  @Post('phone/otp/verify')
  async verifyPhone(
    @Body() params: PhoneVerificationRequest,
  ): Promise<PhoneVerificationResponse> {
    try {
      const cleanedPhoneNumber = cleanPhoneNumber(params.vMobile, '62');
      Logger.log('INSIDE PHONE VERIFICATION ' + cleanedPhoneNumber);
      const verified = await this.phoneService.verifyOTP(
        cleanedPhoneNumber,
        params.otp,
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
      return Promise.reject(err);
    }
  }

  @Post('phone/forgot-password')
  async forgotEmailPassword(
    @Body() params: ForgotPhonePassword,
  ): Promise<any> {
    const cleanedPhoneNumber = cleanPhoneNumber(params.vMobile, '62');
    const sendPhone = await this.phoneService.sendForgotPhonePassword(
      cleanedPhoneNumber,
    );
    Logger.log(process.env.BYPASS_PHONE_MESSAGE)
    if (process.env.BYPASS_PHONE_MESSAGE === 'true') {
      return { isSuccess: true, OTP: sendPhone }
    } 
    return { isSuccess: false }
  }

  @Post('phone/change-password')
  async changePassword(
    @Body() body: NewPhonePasswordRequest,
  ): Promise<{ isSuccess: boolean }> {
    Logger.log('INSIDE CHANGE PASSWORD');
    const cleanedPhoneNumber = cleanPhoneNumber(body.vMobile, '62');
    const result = await this.phoneService.changePhonePassword(
      cleanedPhoneNumber,
      body.OTP,
      body.newPassword,
    );
    return { isSuccess: result };
  }

  @ApiBearerAuth()
  @Post('add/email')
  @UseGuards(AuthGuard())
  async addphone(
    @Body() params: AddEmailRequest,
  ): Promise<{ isSuccess: boolean; message: string; otp: string }> {
    const emailSendOTP = await this.authService.sendEmailOTP(params.vEmail, '');
    if (emailSendOTP) {
      return {
        isSuccess: true,
        message: 'Waiting for Email 2FA',
        otp: emailSendOTP,
      };
    } else return { isSuccess: false, message: 'Failed to add Email', otp: '' };
  }

  @ApiBearerAuth()
  @Post('add/email/verify')
  @UseGuards(AuthGuard())
  async addphoneVerify(
    @Request() req,
    @Body() params: EmailVerificationRequest,
  ): Promise<{ isSuccess: boolean; message: string }> {
    const verification = await this.authService.verifyEmailToken(
      params.otp,
      params.vEmail,
    );
    if (verification.token != '') {
      await this.phoneService.updateUserEmail(req.user.user, params.vEmail);
      return { isSuccess: true, message: 'Add email is successful' };
    } else return { isSuccess: false, message: 'Failed to assign Email' };
  }
}
