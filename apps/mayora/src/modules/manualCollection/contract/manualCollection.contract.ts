import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export abstract class CompanyApiContract {
  // abstract findAll(): Promise<FindAllResponse>;
  abstract findOne(params: FindOneRequest): Promise<ICompanyListItem>;
  abstract findDetailByIdShift(id: string, shift: string): Promise<ICompanyListItem>;
  abstract create(params: CreateRequestManualCollection): Promise<CreateResponse>;
  abstract update(params: UpdateRequestManualCollection, id: string): Promise<UpdateResponse>;
  abstract remove(id: String): Promise<RemoveResponse>;
  // abstract changeStatus(params: EditStatusProps): Promise<UpdateResponse>;
}

export interface ICompanyListItem {
  id: string;
  machineId: string;
  categoryId: string;
  categoryType: string;
  value: string;
  shift: string;
  remark: string;
  updatedAt: Date;
  createdAt: Date;
  status: string;
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

export class CreateRequestManualCollection {
  @IsNotEmpty()
  @ApiProperty()
  machineId: string;

  @IsNotEmpty()
  @ApiProperty()
  categoryId: string;

  @ApiPropertyOptional()
  value: string;

  @ApiPropertyOptional()
  shift: string;

  @ApiPropertyOptional()
  remark: string;

  @ApiProperty()
  createdBy: string;
}

export interface CreateResponse {
  isSuccess: boolean;
}

export class UpdateRequestManualCollection {
  @IsNotEmpty()
  @ApiProperty()
  machineId: string;

  @IsNotEmpty()
  @ApiProperty()
  categoryId: string;

  @ApiPropertyOptional()
  value: string;

  @ApiPropertyOptional()
  shift: string;

  @ApiPropertyOptional()
  remark: string;

  @ApiPropertyOptional()
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

