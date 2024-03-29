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
    HttpException,
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
import { ProductionTargetService } from './productionTarget.service';
import { AuthPermissionGuard } from '../../core/auth.guard';
import { getErrorStatusCode } from '@qbit-tech/libs-utils';
import { ApiOperation, ApiTags } from '@nestjs/swagger';


@ApiTags('productionTargets')
@Controller('productionTargets')
export class ProductionTargetController {
    constructor(private readonly productionTargetService: ProductionTargetService) { }

    @ApiOperation({ summary: 'Get list of release' })
    @Get()
    // //@UseGuards(AuthPermissionGuard())
    async getCompanyList(
        @Query() query: FindAllRequest,
    ): Promise<FindAllResponse> {
        const params: FindAllRequest = {
            keyword: query.keyword ? query.keyword : "",
            limit: query.limit ? Number(query.limit) : 10,
            offset: query.offset ? Number(query.offset) : 0,
            machineId: query.machineId ? query.machineId : "",
            createdAt: query.createdAt ? query.createdAt : null
        };

        return this.findAll(params);
    }

    async findAll(params: FindAllRequest): Promise<FindAllResponse> {
        return await this.productionTargetService.findAll(params);
    }


    @Get('log')
    // //@UseGuards(AuthPermissionGuard())
    async getLogList(
        @Query() query: FindAllRequest,
    ): Promise<FindAllResponse> {
        const params: FindAllRequest = {
            keyword: query.keyword ? query.keyword : "",
            limit: query.limit ? Number(query.limit) : 10,
            offset: query.offset ? Number(query.offset) : 0,
            machineId: query.machineId ? query.machineId : "",
            createdAt: query.createdAt ? query.createdAt : null
        };

        return this.findAllLog(params);
    }

    async findAllLog(params: FindAllRequest): Promise<FindAllResponse> {
        return await this.productionTargetService.findAllLog(params);
    }


    @Get(':id')
    //@UseGuards(AuthPermissionGuard())
    async getDetailCompany(
        @Param() param: { id: string },
    ): Promise<ICompanyListItem> {
        return this.findOne({ id: param.id });
    }

    async findOne(params: FindOneRequest): Promise<ICompanyListItem> {
        return await this.productionTargetService.findOne(params);
    }






    @Post()
    // //@UseGuards(AuthPermissionGuard())//
    async createCompany(
        @Req() request: any,
        @Body() body: CreateRequest,
    ): Promise<CreateResponse> {
        // const localEmployee: IMe = request.user;
        return await this.create({ ...body });
    }
    
    async create(params: CreateRequest): Promise<CreateResponse> {
        return await this.productionTargetService.create(params);
    }






    @Put(':id')
    //@UseGuards(AuthPermissionGuard())
    async updateCompany(
        @Param() param: { id: string },
        @Req() request: any,
        @Body() body: UpdateRequest,
    ): Promise<CreateResponse> {
        return await this.update({
            ...body,
        }, param.id);
    }

    async update(params: UpdateRequest, id: string): Promise<UpdateResponse> {
        return await this.productionTargetService.update(params, id);
    }





    @Delete(':id')
    //@UseGuards(AuthPermissionGuard())//
    async deleteItem(
        @Param() param: { id: string },
        @Req() request: RemoveRequest,
        @Body() body: RemoveRequest,
    ): Promise<CreateResponse> {
        return await this.remove(param.id);
    }

    async remove(
        id: string,
    ): Promise<RemoveResponse> {
        return await this.productionTargetService.remove(id);
    }

}
