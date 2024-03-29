import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export abstract class CompanyApiContract {
  abstract findAll(): Promise<FindAllResponse>;
  abstract findAllManualCollection(date: string): Promise<FindAllResponse>;
  abstract findAllTrouble(): Promise<FindAllResponse>;
  abstract findOne(params: FindOneRequest): Promise<ICompanyListItem>;
  abstract create(params: CreateRequestCategoryParent): Promise<CreateResponse>;
  abstract update(params: UpdateRequestCategoryParent, id: number): Promise<UpdateResponse>;
  abstract remove(id: number): Promise<RemoveResponse>;
}

export interface ICompanyListItem {
  id: number;
  name: string;
  categoryParentId: number;
  categoryLevel: string;
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

export class CreateRequestCategoryParent {
  @IsNotEmpty()
  @ApiProperty({ example: 'Down Time Losses' })
  readonly name: string;

  @ApiPropertyOptional()
  categoryParentId: number;

  @IsNotEmpty()
  @ApiProperty({ example: 'level1' })
  categoryLevel: string;

  @ApiProperty()
  createdBy: string;
}

export interface CreateResponse {
  isSuccess: boolean;
}

export class UpdateRequestCategoryParent {
  @IsNotEmpty()
  @ApiProperty({ example: 'Down Time Losses' })
  name: string;

  @ApiPropertyOptional()
  categoryParentId: number;

  @IsNotEmpty()
  @ApiProperty()
  categoryLevel: string;

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
  id: number;
}

export interface RemoveResponse {
  isSuccess: boolean;
}

