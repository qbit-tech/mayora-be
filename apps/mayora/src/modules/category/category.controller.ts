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
  CategoryApiContract,
  FindAllRequest,
  FindAllResponse,
  FindOneRequest,
  CreateRequestCategory,
  CreateResponse,
  UpdateRequestCategory,
  UpdateResponse,
  EditStatusProps,
  ICompanyListItem,
  RemoveRequest,
  RemoveResponse,
  FindOneByMachineRequest,
} from './contract';
import { CategoryService } from './category.service';
import {
  AuthPermissionGuard, FEATURE_PERMISSIONS,
} from '@qbit-tech/libs-session';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DefaultFindAllRequest } from '@qbit-tech/libs-utils';
import { AppRequest } from '@qbit/appContract/app.contract';

@ApiTags('Category')
@Controller('categories')
export class CategoryController implements CategoryApiContract {
  constructor(private companyService: CategoryService) { }

  @ApiBearerAuth()
  @Get()
  @UseGuards(AuthPermissionGuard())
  async getCompanyList(
    @Query() query: DefaultFindAllRequest,
  ): Promise<FindAllResponse> {
    const params: FindAllRequest = {
      limit: Number(query.limit) ?? 10,
      offset: Number(query.offset) ?? 0,
      order: 'desc',
    };

    return this.findAll(params);
  }

  async findAll(params: FindAllRequest): Promise<FindAllResponse> {
    return await this.companyService.findAll(params);
  }

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(
    AuthPermissionGuard(),
  )
  async getDetailCompany(
    @Param('id') id: number,
  ): Promise<ICompanyListItem> {
    return this.findOne({ id: id });
  }

  async findOne(params: FindOneRequest): Promise<ICompanyListItem> {
    return await this.companyService.findOne(params);
  }

  @ApiBearerAuth()
  @Get(':id/:machineId')
  @UseGuards(
    AuthPermissionGuard(),
  )
  async getDetailByMachine(
    @Param('id') id: number,
    @Param('machineId') machineId: number,
  ): Promise<ICompanyListItem> {
    return this.findOneByMachine({ id: id, machineId: machineId });
  }

  async findOneByMachine(params: FindOneByMachineRequest): Promise<ICompanyListItem> {
    return await this.companyService.findOneByMachine(params);
  }

  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthPermissionGuard())
  async createCompany(
    @Req() request: any,
    @Body() body: CreateRequestCategory,
  ): Promise<CreateResponse> {
    const me: string = request.user.userId;
    return await this.create({ ...body, createdBy: me });
  }

  async create(params: CreateRequestCategory): Promise<CreateResponse> {
    return await this.companyService.create(params);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @UseGuards(AuthPermissionGuard())
  async updateCompany(
    @Param('id') id: number,
    @Req() request: any,
    @Body() body: UpdateRequestCategory,
  ): Promise<CreateResponse> {
    const me: string = request.user.userId;
    return await this.update({
      ...body,
      updatedBy: me,
    }, id);
  }
  async update(params: UpdateRequestCategory, id: number): Promise<UpdateResponse> {
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
