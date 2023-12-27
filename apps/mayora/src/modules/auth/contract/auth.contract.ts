import { IsNotEmpty } from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { UserData } from '../../user/user.service';
import { Gender } from '../../user/user.entity';

export abstract class AuthApiContract {
  abstract register(
    req: RegisterRequest, // in @body
  ): Promise<RegisterResponse>;
  abstract signOut(
    user: SignOutRequest, // in @req
    platform: string,
  ): Promise<SignOutResponse>;
}

export abstract class PhoneAuthApiContract {
  abstract sendOtp(req: PhoneSignInRequest): Promise<PhoneOTPResponse>;
}

export class DefaultRequestHeader {
  @ApiProperty()
  readonly sessionId: string;
  @ApiProperty()
  readonly guid: string;
  @ApiProperty()
  readonly user: UserData;
}

export class SignInRequest {
  @ApiPropertyOptional()
  readonly vEmail: string;

  @ApiPropertyOptional()
  readonly vMobile: string;

  @ApiProperty()
  readonly vPassword: string;

  @ApiProperty()
  readonly vMobileGUID: string;
}

export class SignInResponse {
  @ApiProperty()
  readonly tempSession: string;

  @ApiProperty()
  readonly status: string;

  @ApiProperty()
  readonly available2FA: string[];
}

export class PhoneSignInRequest {
  @ApiProperty()
  readonly vMobile: string;

  @ApiPropertyOptional()
  readonly tempSession?: string;
}

export class PhoneOTPResponse {
  @ApiProperty()
  readonly vMobile: string;

  @ApiPropertyOptional()
  readonly OTP?: string;
}

export class PhoneSignInResponse {
  @ApiPropertyOptional()
  readonly vTokenMobile: string;
}

export class ValidityCheckInput {
  @ApiPropertyOptional()
  readonly vMobile: string;

  @ApiPropertyOptional()
  readonly vUsername: string;

  @ApiPropertyOptional()
  readonly vEmail: string;
}

export class ValidityCheckResponse {
  @ApiProperty()
  readonly vMobile: boolean;

  @ApiProperty()
  readonly vUsername: boolean;

  @ApiProperty()
  readonly vEmail: boolean;
}

export class RegisterRequest {

  @ApiPropertyOptional()
  readonly vEmail?: string;

  @ApiPropertyOptional()
  readonly vMobile?: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly vPassword: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly vFirstName: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly vLastName: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly vNickName: string;

  @IsNotEmpty()
  @ApiProperty({ example: '1: MALE, 2: FEMALE' })
  readonly iGender: number;

  @IsNotEmpty()
  @ApiProperty({ example: '2001-11-21' })
  readonly birthdate: Date;

  @ApiPropertyOptional()
  readonly verifiedEmailSessionId: string;

  @ApiPropertyOptional()
  readonly verifiedPhoneSessionId: string;
}

export class RegisterResponse {
  @ApiProperty()
  readonly isSuccess: boolean;
}

export class SignOutRequest {
  @IsNotEmpty()
  @ApiProperty()
  platform: string;
}

export class SignOutResponse {
  @ApiProperty()
  readonly isSuccess: boolean;
}

export class EmailVerificationRequest {
  @ApiProperty()
  vEmail: string;

  @ApiProperty()
  otp: string;
}

export class EmailVerificationResponse {
  @ApiProperty()
  isSuccess: boolean;

  @ApiProperty()
  sessionId: string;
}

export class PhoneVerificationResponse {
  @ApiProperty()
  isSuccess: boolean;

  @ApiProperty()
  sessionId: string;
}

export class PhoneVerificationRequest {
  @ApiProperty()
  vMobile: string;

  @ApiProperty()
  otp: string;
}

export class ForgotEmailPassword {
  @ApiProperty()
  vEmail: string;
}

export class ForgotPhonePassword {
  @ApiProperty()
  vMobile: string;
}

export class NewPhonePasswordRequest {
  @ApiProperty()
  vMobile: string;

  @ApiProperty()
  OTP: string;

  @ApiProperty()
  newPassword: string;
}
export class NewPasswordRequest {
  @ApiProperty()
  vEmail: string;

  @ApiProperty()
  OTP: string;

  @ApiProperty()
  newPassword: string;
}

export class ResendEmailVerificationRequest {
  @ApiProperty()
  vEmail: string;

  @ApiPropertyOptional()
  tempSession?: string;
}

export class EmailOTPResponse {
  @ApiProperty()
  vEmail: string;

  @ApiProperty()
  OTP?: string;
}

export class AuthWithSessionRequest {
  @ApiProperty()
  token: string;

  @ApiProperty()
  vMobileGUID: string;
}

export class AddPhoneRequest {
  @ApiProperty()
  vMobile: string;
}

export class AddEmailRequest {
  @ApiProperty()
  vEmail: string;
}
