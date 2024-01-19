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
import { oeeTargetService } from './oeeTarget.service';
import { AuthPermissionGuard } from '../../core/auth.guard';
import { getErrorStatusCode } from '@qbit-tech/libs-utils';
import { ApiOperation, ApiTags } from '@nestjs/swagger';


@ApiTags('oeeTargets')
@Controller('oeeTargets')
export class OeeTargetController {
    constructor(private readonly oeeTargetService: oeeTargetService) { }

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
        return await this.oeeTargetService.findAll(params);
    }





    @Get(':id')
    //@UseGuards(AuthPermissionGuard())
    async getDetailCompany(
        @Param() param: { id: string },
    ): Promise<ICompanyListItem> {
        return this.findOne({ id: param.id });
    }

    async findOne(params: FindOneRequest): Promise<ICompanyListItem> {
        return await this.oeeTargetService.findOne(params);
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
        return await this.oeeTargetService.create(params);
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
            updatedBy: "ju489eikjnjhgytr",
        }, param.id);
    }

    async update(params: UpdateRequest, id: string): Promise<UpdateResponse> {
        return await this.oeeTargetService.update(params, id);
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
        return await this.oeeTargetService.remove(id);
    }

}
