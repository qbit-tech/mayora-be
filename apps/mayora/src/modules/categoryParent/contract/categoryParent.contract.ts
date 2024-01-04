export abstract class CompanyApiContract {
  // abstract findAll(params: FindAllRequest): Promise<FindAllResponse>;
  abstract findOne(params: FindOneRequest): Promise<ICompanyListItem>;
  abstract create(params: CreateRequest): Promise<CreateResponse>;
  abstract update(params: UpdateRequest): Promise<UpdateResponse>;
  abstract remove(params: RemoveRequest): Promise<RemoveResponse>;
}

export interface ICompanyListItem {
  id: string;
  name: string;
  categoryParentId: string;
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
  id: string;
}

export interface CreateRequest {
  name: string;
  categoryParentId: string;
  categoryLevel: string;
  createdBy: string;
}

export interface CreateResponse {
  isSuccess: boolean;
}

export interface UpdateRequest {
  id: string;
  name: string;
  categoryParentId: string;
  categoryLevel: string;
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

