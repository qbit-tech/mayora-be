import {
  Controller,
  Get,
  Post,
  Query,
  Put,
  Body,
  UseGuards,
  Param,
  Patch,
  Req,
  Delete,
} from '@nestjs/common';
import {
  CompanyApiContract,
  FindAllRequest,
  FindAllResponse,
  FindOneRequest,
  CreateRequestManualCollection,
  CreateResponse,
  UpdateRequestManualCollection,
  UpdateResponse,
  EditStatusProps,
  ICompanyListItem,
  RemoveRequest,
  RemoveResponse,
} from './contract';
import { ManualCollectionService } from './manualCollection.service';
import { AuthPermissionGuard } from '../../core/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Manual Collection')
@Controller('manual-collection')
export class ManualCollectionController implements CompanyApiContract {
  constructor(private companyService: ManualCollectionService) { }

  @Get(':id')
  //@UseGuards(AuthPermissionGuard())//
  async getDetailCompany(
    @Param('id') id: string,
  ): Promise<ICompanyListItem> {
    return this.findOne({ id: id });
  }

  async findOne(params: FindOneRequest): Promise<ICompanyListItem> {
    return await this.companyService.findOne(params);
  }

  @Post()
  // //@UseGuards(AuthPermissionGuard())//
  async createCompany(
    @Req() request: any,
    @Body() body: CreateRequestManualCollection,
  ): Promise<CreateResponse> {
    // const localEmployee: IMe = request.user;
    return await this.create({ ...body, createdBy: "djhuy8eufdjachgy8" });
  }

  async create(params: CreateRequestManualCollection): Promise<CreateResponse> {
    return await this.companyService.create(params);
  }

  @Patch(':id')
  //@UseGuards(AuthPermissionGuard())
  async updateCompany(
    @Param('id') id: string,
    @Req() request: any,
    @Body() body: UpdateRequestManualCollection,
  ): Promise<CreateResponse> {
    // const localEmployee: IMe = request.user;
    return await this.update({
      ...body,
      updatedBy: "ju489eikjnjhgytr",
    }, id);
  }
  async update(params: UpdateRequestManualCollection, id: string): Promise<UpdateResponse> {
    return await this.companyService.update(params, id);
  }

  @Delete(':id')
  //@UseGuards(AuthPermissionGuard())//
  async deleteItem(
    @Param('id') id: string,
    @Req() request: RemoveRequest,
    @Body() body: RemoveRequest,
  ): Promise<CreateResponse> {
    return await this.remove(id);
  }

  async remove(
    id: string,
  ): Promise<RemoveResponse> {
    return await this.companyService.remove(id);
  }
}
