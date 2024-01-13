import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export abstract class CategoryApiContract {
  abstract findAll(params: FindAllRequest): Promise<FindAllResponse>;
  abstract findOne(params: FindOneRequest): Promise<ICompanyListItem>;
  abstract create(params: CreateRequestCategory): Promise<CreateResponse>;
  abstract update(params: UpdateRequestCategory, id: string): Promise<UpdateResponse>;
  abstract remove(id: string): Promise<RemoveResponse>;
  // abstract changeStatus(params: EditStatusProps): Promise<UpdateResponse>;
}

export interface ICompanyListItem {
  id: string;
  name: string;
  categoryParentId: string;
  categoryType: string;
  updatedBy: string;
  createdBy: string;
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

export class CreateRequestCategory {
  @IsNotEmpty()
  @ApiProperty({ example: 'Trial Product (NDP)' })
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  categoryParentId: string;

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
  categoryParentId: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'manualcollection' })
  categoryType: string;

  @ApiProperty()
  updatedBy: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'active' })
  status: string;
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

