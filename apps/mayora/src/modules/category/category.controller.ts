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
  CreateRequest,
  CreateResponse,
  UpdateRequest,
  UpdateResponse,
  EditStatusProps,
  ICompanyListItem,
  RemoveRequest,
  RemoveResponse,
} from './contract';
import { CategoryService } from './category.service';
import { AuthGuard } from '../../core/auth.guard';

@Controller('category')
export class CategoryController implements CompanyApiContract {
  constructor(private companyService: CategoryService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getCompanyList(
    @Query() query: FindAllRequest,
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

  @Get(':id')
  @UseGuards(AuthGuard)
  async getDetailCompany(
    @Param() param: { id: string },
  ): Promise<ICompanyListItem> {
    return this.findOne({ id: param.id });
  }

  async findOne(params: FindOneRequest): Promise<ICompanyListItem> {
    return await this.companyService.findOne(params);
  }

  @Post()
  // @UseGuards(AuthGuard)
  async createCompany(
    @Req() request: any,
    @Body() body: Omit<CreateRequest, 'createdBy'>,
  ): Promise<CreateResponse> {
    // const localEmployee: IMe = request.user;
    return await this.create({ ...body, createdBy: "djhuy8eufdjachgy8"});
  }

  async create(params: CreateRequest): Promise<CreateResponse> {
    return await this.companyService.create(params);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async updateCompany(
    @Param() param: { id: string },
    @Req() request: any,
    @Body() body: Omit<UpdateRequest, 'updatedAt'>,
  ): Promise<CreateResponse> {
    // const localEmployee: IMe = request.user;
    return await this.update({
      ...body,
      updatedBy: "ju489eikjnjhgytr"
    });
  }
  async update(params: UpdateRequest): Promise<UpdateResponse> {
    return await this.companyService.update(params);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteItem(
    @Req() request: RemoveRequest,
    @Body() body: RemoveRequest,
  ): Promise<CreateResponse> {
    return await this.remove(body);
  }

  async remove(
    body: RemoveRequest,
  ): Promise<RemoveResponse> {
    return await this.companyService.remove(body);
  }
}
