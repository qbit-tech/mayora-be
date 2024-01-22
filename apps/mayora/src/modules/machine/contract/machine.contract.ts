import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { AppRequest } from "@qbit/appContract/app.contract";
import { IsNotEmpty } from "class-validator";

export abstract class MachineApiContract {
  abstract findAll(params: FindAllRequest): Promise<FindAllResponse>;
  // abstract findOne(params: FindOneRequest): Promise<ICompanyListItem>;
  abstract create(params: CreateRequest): Promise<CreateResponse>;
  // abstract update(params: UpdateRequest, id: string): Promise<UpdateResponse>;
  abstract remove(id: string): Promise<RemoveResponse>;
}

export interface ICompanyListItem {
  id: string;
  remark: string;
  machineId: string;
  categoryId: string;
  startTime: string;
  endTime: string;
  updatedBy: string;
  createdBy: string;
  updatedAt: string;
  createdAt: string;
}


export interface ICompanyAssociate {
  iCompany: number;
  vName: string;
  vAddress1: string;
  vAddress2?: string;
  vAddress3?: string;
  vAddress4?: string;
  vAddress5?: string;
}

export interface FindAllRequest {
  keyword?: string;
  limit?: number;
  offset?: number;
  order?: string;
}

export interface FindAllResponse {
  count: number;
  next: string;
  prev: string;
  results: ICompanyListItem[];
}

export interface FindOneRequest {
  id: string;
}

export class CreateRequest {
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  createdBy: string;
}

export interface CreateResponse {
  isSuccess: boolean;
}

// export interface UpdateRequest {
//   id: string;
//   name: string;
//   categoryParentId: string;
//   categoryType: string;
//   updatedBy: string;
//   status: string;
// }

export class UpdateRequest {
  @IsNotEmpty()
  @ApiProperty({ example: 'active' })
  readonly machineId: string;

  @IsNotEmpty()
  @ApiProperty()
  categoryId: string;

  @ApiPropertyOptional()
  startTime?: Date;

  @ApiPropertyOptional()
  endTime?: Date;

  @ApiProperty()
  updatedBy: string;
}

export interface UpdateResponse {
  isSuccess: boolean;
}

export interface EditStatusProps {
  iCompany: number;
  iStatus: number;
  iUpdatedBy: number;
}

export interface RemoveRequest {
  id: string;
}

export interface RemoveResponse {
  isSuccess: boolean;
}

