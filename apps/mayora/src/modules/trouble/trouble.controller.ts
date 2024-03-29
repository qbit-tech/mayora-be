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
  CreateRequestTrouble,
  CreateResponse,
  UpdateRequest,
  UpdateResponse,
  EditStatusProps,
  ICompanyListItem,
  RemoveRequest,
  RemoveResponse,
} from './contract';
import { TroubleService } from './trouble.service';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import {
  DefaultFindAllRequest,
} from '@qbit-tech/libs-utils';
import { AuthPermissionGuard } from '@qbit-tech/libs-session';

@ApiTags('Trouble')
@Controller('troubles')
export class TroubleController implements TroubleApiContract {
  constructor(private companyService: TroubleService) { }

  @ApiBearerAuth()
  @Get()
  @UseGuards(AuthPermissionGuard())
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

  @ApiBearerAuth()
  @Get('/production/:machineId/:date')
  @UseGuards(AuthPermissionGuard())
  async getTroubleListByMachie(
    @Param('machineId') machineId: number,
    @Param('date') date: string,
  ): Promise<FindAllResponse> {
    return this.findAllByMachine(machineId, date);
  }

  async findAllByMachine(machineId: number, date: string): Promise<FindAllResponse> {
    return await this.companyService.findAllByMachine(machineId, date);
  }

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthPermissionGuard())
  async getDetailCompany(
    @Param('id') id: number,
  ): Promise<ICompanyListItem> {
    return this.findOneTrouble({ id: id });
  }

  async findOneTrouble(params: FindOneRequest): Promise<ICompanyListItem> {
    return await this.companyService.findOneTrouble(params);
  }

  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthPermissionGuard())
  async createCompany(
    @Req() request: any,
    @Body() body: CreateRequestTrouble,
  ): Promise<CreateResponse> {
    const me: string = request.user.userId;
    return await this.create({ ...body, createdBy: me });
  }

  async create(params: CreateRequestTrouble): Promise<CreateResponse> {
    return await this.companyService.create(params);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @UseGuards(AuthPermissionGuard())
  async updateCompany(
    @Param('id') id: number,
    @Req() request: any,
    @Body() body: UpdateRequest,
  ): Promise<CreateResponse> {
    const me: string = request.user.userId;
    return await this.update({
      ...body,
      updatedBy: me,
    }, id);
  }
  async update(params: UpdateRequest, id: number): Promise<UpdateResponse> {
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
