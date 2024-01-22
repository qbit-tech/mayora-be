import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserDetailModel } from './userDetail.entity';
import {
  FindAllRequest,
  FindAllResponse,
  FindOneRequest,
  CreateRequestDetailUser,
  CreateResponse,
  UpdateRequest,
  UpdateResponse,
  ICompanyListItem,
  RemoveResponse,
} from './contract';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserDetailService {
  constructor(
    @InjectModel(UserDetailModel)
    private readonly userDetailRepositories: typeof UserDetailModel,
  ) { }

  // async findAll(params: FindAllRequest): Promise<FindAllResponse> {
  //   try {
  //     const where = {};

  //     const result = await this.userDetailRepositories.findAll({
  //       where,
  //       attributes: [
  //         'id',
  //         'userDetailId',
  //         'categoryId',
  //         'startTime',
  //         'endTime',
  //         'remark',
  //         'updatedBy',
  //         'status',
  //         'createdBy',
  //         'createdAt',
  //         'updatedAt',
  //       ],
  //       offset: params.offset,
  //       limit: params.limit,
  //     });
  //     const count = await this.userDetailRepositories.count({ where });
  //     return {
  //       count: count,
  //       next: '',
  //       prev: '',
  //       results: result.map(item => item.get()),
  //     };
  //   } catch (error) {
  //     throw new HttpException(
  //       {
  //         status: 'ERR_COMPANY_REQUEST',
  //         message: error.message,
  //         payload: null,
  //       },
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  // }

  // async findOne(params: FindOneRequest): Promise<ICompanyListItem> {
  //   try {
  //     const result = await this.userDetailRepositories.findOne({
  //       where: { id: params.id },
  //       attributes: [
  //         'id',
  //         'userDetailId',
  //         'categoryId',
  //         'startTime',
  //         'endTime',
  //         'remark',
  //         'updatedBy',
  //         'status',
  //         'createdBy',
  //         'createdAt',
  //         'updatedAt',
  //       ],
  //     });

  //     return result ? result.get() : null;
  //   } catch (error) {
  //     throw new HttpException(
  //       {
  //         status: 'ERR_COMPANY_NOT_FOUND',
  //         message: error.message,
  //         payload: null,
  //       },
  //       HttpStatus.NOT_FOUND,
  //     );
  //   }
  // }

  async create(params: CreateRequestDetailUser): Promise<CreateResponse> {
    try {
      console.log('hjdshjsf', params)
      const result = await this.userDetailRepositories.create({
        id: uuidv4(),
        userId: params.userId,
        machineId: params.machineId,
        createdBy: params.createdBy,
        updatedBy: params.updatedBy,
      });
      console.log("resultjktm", result)

      return { isSuccess: result ? true : false };
    } catch (error) {
      console.log("erorr", error)
      throw new HttpException(
        {
          status: 'ERR_COMPANY_REQUEST',
          message: error.message,
          payload: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // async update(params: UpdateRequest, id: string): Promise<UpdateResponse> {
  //   try {
  //     const trouble = await this.userDetailRepositories.findOne({
  //       where: { id: id },
  //     });

  //     if (trouble === null) {
  //       throw new HttpException(
  //         {
  //           code: 'ERR_COMPANY_NOT_FOUND',
  //           message: 'company tidak tersedia',
  //           payload: null,
  //         },
  //         HttpStatus.NOT_FOUND,
  //       );
  //     }

  //     trouble.userDetailId = params.userDetailId;
  //     trouble.categoryId = params.categoryId;
  //     trouble.startTime = params.startTime;
  //     trouble.endTime = params.endTime;
  //     trouble.remark = params.remark;
  //     trouble.status = params.status;
  //     trouble.updatedBy = params.updatedBy;
  //     await trouble.save();

  //     return { isSuccess: true };
  //   } catch (error) {
  //     throw new HttpException(
  //       {
  //         status: 'ERR_COMPANY_UPDATE',
  //         message: error.message,
  //         payload: null,
  //       },
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  // }

  async remove(id: string): Promise<RemoveResponse> {
    try {
      const shipment = await this.userDetailRepositories.findOne({
        where: { id: id },
      });

      if (shipment === null) {
        throw new HttpException(
          {
            code: 'ERR_TROUBLE_NOT_FOUND',
            message: 'trouble tidak tersedia',
            payload: null,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      await shipment.destroy();

      return { isSuccess: true };
    } catch (error) {
      throw new HttpException(
        {
          status: 'ERR_SHIPMENT_UPDATE',
          message: error.message,
          payload: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
