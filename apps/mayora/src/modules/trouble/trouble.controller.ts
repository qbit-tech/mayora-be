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
  TroubleApiContract,
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
import { TroubleService } from './trouble.service';
import { AuthPermissionGuard } from '../../core/auth.guard';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import {
  DefaultFindAllRequest,
} from '@qbit-tech/libs-utils';

@ApiTags('Trouble')
@Controller('troubles')
export class TroubleController implements TroubleApiContract {
  constructor(private companyService: TroubleService) { }

  @Get()
  //@UseGuards(AuthPermissionGuard())
  async getCompanyList(
    @Query() params: DefaultFindAllRequest,
  ): Promise<FindAllResponse> {
    const paramsSend: FindAllRequest = {
      limit: Number(params.limit) ?? 10,
      offset: Number(params.offset) ?? 0,
      order: 'desc',
    };

    return this.findAll(params);
  }

  async findAll(params: FindAllRequest): Promise<FindAllResponse> {
    return await this.companyService.findAll(params);
  }

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
    @Body() body: CreateRequest,
  ): Promise<CreateResponse> {
    // const localEmployee: IMe = request.user;
    return await this.create({ ...body, createdBy: "djhuy8eufdjachgy8" });
  }

  async create(params: CreateRequest): Promise<CreateResponse> {
    return await this.companyService.create(params);
  }

  @Patch(':id')
  //@UseGuards(AuthPermissionGuard())
  async updateCompany(
    @Param('id') id: string,
    @Req() request: any,
    @Body() body: UpdateRequest,
  ): Promise<CreateResponse> {
    // const localEmployee: IMe = request.user;
    return await this.update({
      ...body,
      updatedBy: "ju489eikjnjhgytr",
    }, id);
  }
  async update(params: UpdateRequest, id: string): Promise<UpdateResponse> {
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
