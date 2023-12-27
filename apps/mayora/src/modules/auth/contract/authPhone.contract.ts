import { IsNotEmpty } from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export abstract class AuthPhoneContract {
  abstract signIn(
    req: SignInPhoneRequest, // in @body
  ): Promise<SignInPhoneResponse>;
}

export class SignInPhoneRequest {
  @IsNotEmpty()
  @ApiProperty()
  readonly sessionId: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly otp: string;
}

export class SignInPhoneResponse {
  @ApiProperty()
  readonly token: string;

  @ApiProperty()
  readonly isNewAccount: boolean;
}

export class SendOtpPhoneRequest {
  @IsNotEmpty()
  @ApiProperty()
  phoneNumber: string;
}

export class SendOtpPhoneResponse {
  @ApiProperty()
  readonly sessionId: string;
}
