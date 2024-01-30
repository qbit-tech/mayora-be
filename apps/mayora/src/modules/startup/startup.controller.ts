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
  StartupApiContract,
  FindAllRequest,
  FindAllResponse,
  FindOneRequest,
  CreateRequestStartup,
  CreateResponse,
  UpdateRequestStartup,
  UpdateResponse,
  EditStatusProps,
  ICompanyListItem,
  RemoveRequest,
  RemoveResponse,
  FindOneByMachineRequest,
} from './contract';
import { StartupService } from './startup.service';
import {
  AuthPermissionGuard, FEATURE_PERMISSIONS,
} from '@qbit-tech/libs-session';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DefaultFindAllRequest } from '@qbit-tech/libs-utils';
import { AppRequest } from '@qbit/appContract/app.contract';

@ApiTags('Startup')
@Controller('startup')
export class StartupController implements StartupApiContract {
  constructor(private companyService: StartupService) { }

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

  // @ApiBearerAuth()
  // @Get(':id')
  // @UseGuards(
  //   AuthPermissionGuard(),
  // )
  // async getDetailCompany(
  //   @Param('id') id: number,
  // ): Promise<ICompanyListItem> {
  //   return this.findOne({ id: id });
  // }

  // async findOne(params: FindOneRequest): Promise<ICompanyListItem> {
  //   return await this.companyService.findOne(params);
  // }

  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthPermissionGuard())
  async createCompany(
    @Req() request: any,
    @Body() body: CreateRequestStartup,
  ): Promise<CreateResponse> {
    const me: string = request.user.userId;
    return await this.create({ ...body, createdBy: me });
  }

  async create(params: CreateRequestStartup): Promise<CreateResponse> {
    return await this.companyService.create(params);
  }

  // @ApiBearerAuth()
  // @Patch(':id')
  // @UseGuards(AuthPermissionGuard())
  // async updateCompany(
  //   @Param('id') id: number,
  //   @Req() request: any,
  //   @Body() body: UpdateRequestStartup,
  // ): Promise<CreateResponse> {
  //   const me: string = request.user.userId;
  //   return await this.update({
  //     ...body,
  //     updatedBy: me,
  //   }, id);
  // }
  // async update(params: UpdateRequestStartup, id: number): Promise<UpdateResponse> {
  //   return await this.companyService.update(params, id);
  // }

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
