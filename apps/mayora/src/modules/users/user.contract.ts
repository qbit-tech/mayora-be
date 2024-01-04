import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { status } from './user.entity';
export abstract class UserContract {};

export class DefaultFindAllRequest {
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    readonly offset: number;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    readonly limit: number;
}

export class DefaultFindAllResponse {
    readonly count: number;
    readonly prev: string;
    readonly next: string;
}

export class UserFindAllRequest extends DefaultFindAllRequest {}
export class UserProperties {
  @IsNotEmpty()
  @ApiProperty()
  readonly id: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly roleId: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly identifier: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly status: status;
  
  @ApiProperty()
  @IsNotEmpty()
  readonly createdAt: Date;
  
  @ApiProperty()
  @IsNotEmpty()
  readonly updatedAt: Date;

  @ApiProperty()
  @IsNotEmpty()
  readonly createdBy: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly updatedBy: string;
}

export class UserFindAllResponse extends DefaultFindAllResponse {
    results: UserProperties[];
}

export class SignInRequest {
    @ApiProperty()
    @IsNotEmpty()
    readonly email: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly password: string;
}

export class NewUserRequest {

    @ApiProperty()
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly email: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly password: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly identifier: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly status: status;

    @IsNotEmpty()
    @ApiProperty()
    readonly roleId: string;
}

export class NewUserResponse extends UserProperties {};

export class UpdateUserRequest extends NewUserRequest {}