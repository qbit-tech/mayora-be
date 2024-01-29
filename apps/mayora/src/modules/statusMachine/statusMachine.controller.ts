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
  StatusMachineApiContract,
  FindAllRequest,
  FindAllResponse,
  FindOneRequest,
  CreateRequestStatusMachine,
  CreateResponse,
  UpdateRequestStatusMachine,
  UpdateResponse,
  EditStatusProps,
  ICompanyListItem,
  RemoveRequest,
  RemoveResponse,
  FindOneByMachineRequest,
} from './contract';
import { StatusMachineService } from './statusMachine.service';
import {
  AuthPermissionGuard, FEATURE_PERMISSIONS,
} from '@qbit-tech/libs-session';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DefaultFindAllRequest } from '@qbit-tech/libs-utils';
import { AppRequest } from '@qbit/appContract/app.contract';

@ApiTags('Status Machine')
@Controller('status-machine')
export class StatusMachineController implements StatusMachineApiContract {
  constructor(private companyService: StatusMachineService) { }

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
    @Body() body: CreateRequestStatusMachine,
  ): Promise<CreateResponse> {
    const me: string = request.user.userId;
    return await this.create({ ...body, createdBy: me });
  }

  async create(params: CreateRequestStatusMachine): Promise<CreateResponse> {
    return await this.companyService.create(params);
  }

  // @ApiBearerAuth()
  // @Patch(':id')
  // @UseGuards(AuthPermissionGuard())
  // async updateCompany(
  //   @Param('id') id: number,
  //   @Req() request: any,
  //   @Body() body: UpdateRequestStatusMachine,
  // ): Promise<CreateResponse> {
  //   const me: string = request.user.userId;
  //   return await this.update({
  //     ...body,
  //     updatedBy: me,
  //   }, id);
  // }
  // async update(params: UpdateRequestStatusMachine, id: number): Promise<UpdateResponse> {
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
