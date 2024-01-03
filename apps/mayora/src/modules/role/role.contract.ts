import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
export abstract class RoleContract {};



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

export class RoleFindAllRequest extends DefaultFindAllRequest {}
export class RoleProperties {
  @IsNotEmpty()
  @ApiProperty()
  readonly id: string;
  
  @ApiProperty()
  @IsNotEmpty()
  readonly name: string;
  
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

export class RoleFindAllResponse extends DefaultFindAllResponse {
    results: RoleProperties[];
}

export class NewRoleRequest {
    @ApiProperty()
    @IsNotEmpty()
    readonly name: string;
}

export class NewRoleResponse extends RoleProperties {};

export class UpdateRoleRequest extends NewRoleRequest {}