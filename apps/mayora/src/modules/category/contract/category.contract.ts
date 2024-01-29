import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export abstract class CategoryApiContract {
  abstract findAll(params: FindAllRequest): Promise<FindAllResponse>;
  abstract findOne(params: FindOneRequest): Promise<ICompanyListItem>;
  abstract findOneByMachine(params: FindOneByMachineRequest): Promise<ICompanyListItem>;
  abstract create(params: CreateRequestCategory): Promise<CreateResponse>;
  abstract update(params: UpdateRequestCategory, id: number): Promise<UpdateResponse>;
  abstract remove(id: number): Promise<RemoveResponse>;
  // abstract changeStatus(params: EditStatusProps): Promise<UpdateResponse>;
}

export interface ICompanyListItem {
  id: number;
  name: string;
  categoryParentId: number;
  categoryType: string;
  updatedBy: string;
  createdBy: string;
  updatedAt: Date;
  createdAt: Date;
  unit: string;
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

export class CreateRequestCategory {
  @IsNotEmpty()
  @ApiProperty({ example: 'Trial Product (NDP)' })
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  categoryParentId: number;

  @IsNotEmpty()
  @ApiProperty()
  unit: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'manualcollection' })
  categoryType: string;

  @ApiProperty()
  createdBy: string;
}

export interface CreateResponse {
  isSuccess: boolean;
}

export class UpdateRequestCategory {
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

