import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

// Generated by https://quicktype.io

export type AppRequest = {
  user: User;
};

export type User = {
  sessionId: string;
  user: AppRequestUser;
  platform: string;
};

export type AppRequestUser = {
  iUser: number;
  ipUser: string;
  iStatus: number;
  vFirstName: string;
  vLastName: string;
  vUsername: string;
  vPassword: string;
  vTokenMobile: string;
  dTokenMobileExp: string;
  vTokenWeb: null;
  dTokenWebExp: null;
  vMobile: string;
  jMobileGUID: JMobileGUID[];
  dMobileVerified: string;
  vEmail: string;
  dEmailVerified: string;
  jUserDetails: JUserDetails;
  jOrganization: null;
  jContacts: JContacts;
  jActiveTask: null;
  jListDoneTask: null;
  jUserPriviledge: null;
  jOTP: null;
};

export type JContacts = {
  user: UserElement[];
  company: any[];
};

export type UserElement = {
  iUser: number;
  vEmail: null | string;
  vMobile: null | string;
  vLastName: string;
  vUsername: null | string;
  vFirstName: string;
};

export type JMobileGUID = {
  lastLogin: string;
};

export interface JUserDetails {
  gender: string;
  birthday: string;
  jobTitle: string;
}

export class BaseResponse {
  @ApiProperty()
  code: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  payload: any;
}

export class DefaultFindAllRequest {
  @ApiPropertyOptional()
  search?: string;

  @ApiPropertyOptional()
  limit?: number;

  @ApiPropertyOptional()
  offset?: number;
}

export class PaginationResponse {
  @ApiProperty()
  count: number;

  @ApiProperty()
  prev: string | null;

  @ApiProperty()
  next: string | null;

  @ApiProperty({ example: [] })
  results: any[];
}

export class SimpleResponse {
  @ApiProperty()
  isSuccess: boolean;
}

export class SimpleResponseBase extends BaseResponse {
  @ApiProperty()
  payload: SimpleResponse;
}

export type TBodyRedirect = { success?: string; failed?: string };
export type TQueryRedirect = {
  redirect_success?: string;
  redirect_failed?: string;
};

export const exampleRedirect = {
  success: 'https://app.example/forgot-password?success=true',
  failed: 'https://app.example/forgot-password?success=true',
};
