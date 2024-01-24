export abstract class CompanyApiContract {
    abstract findAll(params: FindAllRequest): Promise<FindAllResponse>;
    abstract findOne(params: FindOneRequest): Promise<ICompanyListItem>;
    abstract create(params: CreateRequest): Promise<CreateResponse>;
    abstract update(params: UpdateRequest, id: string): Promise<UpdateResponse>;
    abstract remove(id: string): Promise<RemoveResponse>;
    // abstract changeStatus(params: EditStatusProps): Promise<UpdateResponse>;
  }
  
  export interface ICompanyListItem {
    id: string;
    machineId: string;
    target  : number;
    activeTarget: Date;
    createdBy: string;
    updatedBy: string;
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
    machineId?: string;
    createdAt?: Date;
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
    machineId: string;
    target  : number;
    activeTarget: Date;
    updatedBy: string;
    createdBy: string;
  }
  
  export interface CreateResponse {
    isSuccess: boolean;
  }
  
  export interface UpdateRequest {
    id: string;
    machineId: string;
    target  : number;
    activeTarget: Date;
    createdBy: string;
    updatedBy: string;
  }
  
  export interface UpdateResponse {
    isSuccess: boolean;
    id: string;
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