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
import { AuthPermissionGuard } from '../../core/auth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Category Parent')
@Controller('category-parents')
export class CategoryParentController implements CompanyApiContract {
  constructor(private companyService: CategoryParentService) { }

  @ApiOperation({ summary: 'Get list of category nested 3 level' })
  @Get()
  //@UseGuards(AuthPermissionGuard())
  async getCompanyList(
  ): Promise<FindAllResponse> {
    return this.findAll();
  }

  async findAll(): Promise<FindAllResponse> {
    return await this.companyService.findAll();
  }

  @ApiOperation({ summary: 'Get list of category nested 3 level with manual collection' })
  @Get('/manual-collection')
  //@UseGuards(AuthPermissionGuard())
  async getManualCollectionList(
  ): Promise<FindAllResponse> {
    return this.findAllManualCollection();
  }

  async findAllManualCollection(): Promise<FindAllResponse> {
    return await this.companyService.findAllManualCollection();
  }

  @ApiOperation({ summary: 'Get list of category nested 3 level with trouble list' })
  @Get('/trouble')
  //@UseGuards(AuthPermissionGuard())
  async getTrouble(
  ): Promise<FindAllResponse> {
    return this.findAllTrouble();
  }

  async findAllTrouble(): Promise<FindAllResponse> {
    return await this.companyService.findAllTrouble();
  }

  @Get(':id')
  //  @UseGuards(AuthPermissionGuard)
  async getDetailCompany(
    @Param('id') id: string,
  ): Promise<ICompanyListItem> {
    return this.findOne({ id: id });
  }

  async findOne(params: FindOneRequest): Promise<ICompanyListItem> {
    return await this.companyService.findOne(params);
  }

  @Post()
  //  @UseGuards(AuthPermissionGuard)
  async createCompany(
    @Req() request: any,
    @Body() body: CreateRequestCategoryParent,
  ): Promise<CreateResponse> {
    // const localEmployee: IMe = request.user;
    return await this.create({ ...body, createdBy: "djhuy8eufdjachgy8" });
  }

  async create(params: CreateRequestCategoryParent): Promise<CreateResponse> {
    return await this.companyService.create(params);
  }

  @Patch(':id')
  //  @UseGuards(AuthPermissionGuard)
  async updateCompany(
    @Param('id') id: string,
    @Req() request: any,
    @Body() body: UpdateRequestCategoryParent,
  ): Promise<CreateResponse> {
    // const localEmployee: IMe = request.user;
    return await this.update({
      ...body,
      updatedBy: "ju489eikjnjhgytr"
    }, id);
  }
  async update(params: UpdateRequestCategoryParent, id: string): Promise<UpdateResponse> {
    return await this.companyService.update(params, id);
  }

  @Delete(':id')
  //  @UseGuards(AuthPermissionGuard)
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
