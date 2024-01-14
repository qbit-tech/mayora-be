import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CategoryModel } from './category.entity';
import {
  FindAllRequest,
  FindAllResponse,
  FindOneRequest,
  CreateRequestCategory,
  CreateResponse,
  UpdateRequestCategory,
  UpdateResponse,
  EditStatusProps,
  ICompanyListItem,
  RemoveResponse,
  RemoveRequest,
} from './contract';
import { getLikeOp } from '../../helpers/db';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(CategoryModel)
    private readonly companyRepositories: typeof CategoryModel,
  ) { }

  async findAll(params: FindAllRequest): Promise<FindAllResponse> {
    try {
      const where = {};
      console.log('hgftyuijkhgft')

      const result = await this.companyRepositories.findAll({
        where,
        attributes: [
          'id',
          'name',
          'categoryParentId',
          'categoryType',
          'updatedBy',
          'unit',
          'createdBy',
          'createdAt',
          'updatedAt',
        ],
        offset: params.offset,
        limit: params.limit,
      });
      const count = await this.companyRepositories.count({ where });
      return {
        count: count,
        next: '',
        prev: '',
        results: result.map(item => item.get()),
      };
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

  async findOne(params: FindOneRequest): Promise<ICompanyListItem> {
    try {
      const result = await this.companyRepositories.findOne({
        where: { id: params.id },
        attributes: [
          'id',
          'name',
          'categoryParentId',
          'categoryType',
          'updatedBy',
          'unit',
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

  async create(params: CreateRequestCategory): Promise<CreateResponse> {
    try {
      console.log('categeiugrkj', params)
      const result = await this.companyRepositories.create({
        id: uuidv4(),
        name: params.name,
        categoryParentId: params.categoryParentId,
        categoryType: params.categoryType,
        createdBy: params.createdBy,
        unit: params.unit
      });

      return { isSuccess: result ? true : false };
    } catch (error) {
      console.log("eroererj", error)
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

  async update(params: UpdateRequestCategory, id: string): Promise<UpdateResponse> {
    try {
      const category = await this.companyRepositories.findOne({
        where: { id: id },
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
      category.unit = params.unit;
      category.categoryType = params.categoryType;
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

  async remove(id: string): Promise<RemoveResponse> {
    try {
      const shipment = await this.companyRepositories.findOne({
        where: { id: id },
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
