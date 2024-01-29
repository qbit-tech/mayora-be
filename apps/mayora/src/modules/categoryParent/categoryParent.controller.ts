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
  CreateRequestCategoryParent,
  CreateResponse,
  UpdateRequestCategoryParent,
  UpdateResponse,
  EditStatusProps,
  ICompanyListItem,
  RemoveRequest,
  RemoveResponse,
} from './contract';
import { CategoryParentService } from './categoryParent.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  FEATURE_PERMISSIONS,
  AuthPermissionGuard,
  SessionService,
} from '@qbit-tech/libs-session';

@ApiTags('Category Parent')
@Controller('category-parents')
export class CategoryParentController implements CompanyApiContract {
  constructor(private companyService: CategoryParentService) { }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get list of category nested 3 level' })
  @Get()
  @UseGuards(AuthPermissionGuard())
  async getCompanyList(
  ): Promise<FindAllResponse> {
    return this.findAll();
  }

  async findAll(): Promise<FindAllResponse> {
    return await this.companyService.findAll();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get list of category nested 3 level with manual collection' })
  @Get('/manual-collection')
  @UseGuards(AuthPermissionGuard())
  async getManualCollectionList(
  ): Promise<FindAllResponse> {
    return this.findAllManualCollection();
  }

  async findAllManualCollection(): Promise<FindAllResponse> {
    return await this.companyService.findAllManualCollection();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get list of category nested 3 level with trouble list' })
  @Get('/trouble')
  @UseGuards(AuthPermissionGuard())
  async getTrouble(
  ): Promise<FindAllResponse> {
    return this.findAllTrouble();
  }

  async findAllTrouble(): Promise<FindAllResponse> {
    return await this.companyService.findAllTrouble();
  }

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
  @Post()
  @UseGuards(AuthPermissionGuard())
  async createCompany(
    @Req() request: any,
    @Body() body: CreateRequestCategoryParent,
  ): Promise<CreateResponse> {
    const me: string = request.user.userId;
    return await this.create({ ...body, createdBy: me });
  }

  async create(params: CreateRequestCategoryParent): Promise<CreateResponse> {
    return await this.companyService.create(params);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @UseGuards(AuthPermissionGuard())
  async updateCompany(
    @Param('id') id: number,
    @Req() request: any,
    @Body() body: UpdateRequestCategoryParent,
  ): Promise<CreateResponse> {
    const me: string = request.user.userId;
    return await this.update({
      ...body,
      updatedBy: me
    }, id);
  }
  async update(params: UpdateRequestCategoryParent, id: number): Promise<UpdateResponse> {
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
