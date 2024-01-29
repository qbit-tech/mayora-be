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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthPermissionGuard } from '@qbit-tech/libs-session';

@ApiTags('Manual Collection')
@Controller('manual-collections')
export class ManualCollectionController implements CompanyApiContract {
  constructor(private companyService: ManualCollectionService) { }

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthPermissionGuard())
  async getDetailCompany(
    @Param('id') id: number,
  ): Promise<ICompanyListItem> {
    return this.findOne({ id: id });
  }

  async findOne(params: FindOneRequest): Promise<ICompanyListItem> {
    return await this.companyService.findOne(params);
  }

  @ApiBearerAuth()
  @Get(':categoryId/:shift')
  @UseGuards(AuthPermissionGuard())
  async getDetailByIdShift(
    @Param('categoryId') categoryId: number,
    @Param('shift') shift: number,
  ): Promise<ICompanyListItem> {
    return this.findDetailByIdShift(categoryId, shift);
  }

  async findDetailByIdShift(id: number, shift: number): Promise<ICompanyListItem> {
    return await this.companyService.findDetailByIdShift(id, shift);
  }

  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthPermissionGuard())
  async createCompany(
    @Req() request: any,
    @Body() body: CreateRequestManualCollection,
  ): Promise<CreateResponse> {
    const me: string = request.user.userId;
    return await this.create({ ...body, createdBy: me });
  }

  async create(params: CreateRequestManualCollection): Promise<CreateResponse> {
    return await this.companyService.create(params);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @UseGuards(AuthPermissionGuard())
  async updateCompany(
    @Param('id') id: number,
    @Req() request: any,
    @Body() body: UpdateRequestManualCollection,
  ): Promise<CreateResponse> {
    const me: string = request.user.userId;
    return await this.update({
      ...body,
      updatedBy: me,
    }, id);
  }
  async update(params: UpdateRequestManualCollection, id: number): Promise<UpdateResponse> {
    return await this.companyService.update(params, id);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AuthPermissionGuard())
  async deleteItem(
    @Param('id') id: number,
    @Req() request: RemoveRequest,
    @Body() body: RemoveRequest,
  ): Promise<CreateResponse> {
    return await this.remove(id);
  }

  async remove(
    id: number,
  ): Promise<RemoveResponse> {
    return await this.companyService.remove(id);
  }
}
