import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CategoryParentModel } from './categoryParent.entity';
import {
  FindAllRequest,
  FindAllResponse,
  FindOneRequest,
  CreateRequest,
  CreateResponse,
  UpdateRequest,
  UpdateResponse,
  EditStatusProps,
  ICompanyListItem,
  RemoveResponse,
  RemoveRequest,
} from './contract';
import { getLikeOp } from '../../helpers/db';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CategoryParentService {
  constructor(
    @InjectModel(CategoryParentModel)
    private readonly companyRepositories: typeof CategoryParentModel,
  ) {}

  // async findAll(params: FindAllRequest): Promise<FindAllResponse> {
  //   try {
  //     const where = {};

  //     const result = await this.companyRepositories.findAll({
  //       where,
  //       attributes: [
  //         'id',
  //         'name',
  //         'categoryParentId',
  //         'categoryType',
  //         'updatedBy',
  //         'status',
  //         'createdBy',
  //         'createdAt',
  //         'updatedAt',
  //       ],
  //       offset: params.offset,
  //       limit: params.limit,
  //     });
  //     const count = await this.companyRepositories.count({ where });
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

  async findOne(params: FindOneRequest): Promise<ICompanyListItem> {
    try {
      const result = await this.companyRepositories.findOne({
        where: { id: params.id },
        attributes: [
          'id',
          'name',
          'categoryParentId',
          'categoryLevel',
          'updatedBy',
          'createdBy',
          'createdAt',
          'updatedAt',
        ],
      });

      return result ? result.get() : null;
    } catch (error) {
      throw new HttpException(
        {
          status: 'ERR_COMPANY_NOT_FOUND',
          message: error.message,
          payload: null,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async create(params: CreateRequest): Promise<CreateResponse> {
    try {
      const result = await this.companyRepositories.create({
        id: uuidv4(),
        name: params.name,
        categoryParentId: params.categoryParentId,
        categoryLevel: params.categoryLevel,
        createdBy: params.createdBy,
      });

      return { isSuccess: result ? true : false };
    } catch (error) {
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

  async update(params: UpdateRequest): Promise<UpdateResponse> {
    try {
      const category = await this.companyRepositories.findOne({
        where: { id: params.id },
      });

      if (category === null) {
        throw new HttpException(
          {
            code: 'ERR_COMPANY_NOT_FOUND',
            message: 'company tidak tersedia',
            payload: null,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      category.name = params.name;
      category.categoryLevel = params.categoryLevel;
      category.updatedBy = params.updatedBy;
      await category.save();

      return { isSuccess: true };
    } catch (error) {
      throw new HttpException(
        {
          status: 'ERR_COMPANY_UPDATE',
          message: error.message,
          payload: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(
    body: RemoveRequest,
  ): Promise<RemoveResponse> {
    try {
      const shipment = await this.companyRepositories.findOne({
        where: { id: body.id },
      });

      if (shipment === null) {
        throw new HttpException(
          {
            code: 'ERR_SHIPMENT_NOT_FOUND',
            message: 'shipment tidak tersedia',
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
