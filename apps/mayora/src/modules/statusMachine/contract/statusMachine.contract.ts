import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export abstract class StatusMachineApiContract {
  abstract findAll(params: FindAllRequest): Promise<FindAllResponse>;
  // abstract findOne(params: FindOneRequest): Promise<ICompanyListItem>;
  abstract create(params: CreateRequestStatusMachine): Promise<CreateResponse>;
  // abstract update(params: UpdateRequestStatusMachine, id: number): Promise<UpdateResponse>;
  abstract remove(id: number): Promise<RemoveResponse>;
  // abstract changeStatus(params: EditStatusProps): Promise<UpdateResponse>;
}

export interface ICompanyListItem {
  id: number;
  status: string;
  machineId: number;
  updatedBy: string;
  createdBy: string;
  updatedAt: Date;
  createdAt: Date;
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
  id: number;
}

export interface FindOneByMachineRequest {
  id: number;
  machineId: number;
}

export class CreateRequestStatusMachine {
  @IsNotEmpty()
  @ApiProperty()
  status?: string;

  @IsNotEmpty()
  @ApiProperty()
  machineId: number;

  @ApiProperty()
  createdBy: string;
}

export interface CreateResponse {
  isSuccess: boolean;
}

export class UpdateRequestStatusMachine {
  @IsNotEmpty()
  @ApiProperty({ example: 'Trial Product (NDP)' })
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  categoryParentId: number;

  @IsNotEmpty()
  @ApiProperty({ example: 'manualcollection' })
  categoryType: string;

  @ApiProperty()
  updatedBy: string;

  @IsNotEmpty()
  @ApiProperty()
  unit: string;
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
  id: number;
}

export interface RemoveResponse {
  isSuccess: boolean;
}

