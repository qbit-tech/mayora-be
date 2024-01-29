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
  FindOneByMachineRequest,
} from './contract';
import { getLikeOp } from '../../helpers/db';
import { v4 as uuidv4 } from 'uuid';
import { ManualCollectionModel } from '../manualCollection/manualCollection.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(CategoryModel)
    private readonly companyRepositories: typeof CategoryModel,
  ) { }

  async findAll(params: FindAllRequest): Promise<FindAllResponse> {
    try {
      const where = {};

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
          'updatedAt'
        ],
        include: [
          {
            model: ManualCollectionModel,
            as: 'manualCollection',
            attributes: [
              'id',
              'machineId',
              'categoryId',
              'shift',
              'value',
              'remark',
              'updatedBy',
              'createdBy',
              'createdAt',
              'updatedAt',
            ],
          },
        ]
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

  async findOneByMachine(params: FindOneByMachineRequest): Promise<ICompanyListItem> {
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
          'updatedAt'
        ],
        include: [
          {
            model: ManualCollectionModel,
            where: { machineId: params.machineId },
            as: 'manualCollection',
            required: false,
            attributes: [
              'id',
              'machineId',
              'categoryId',
              'shift',
              'value',
              'remark',
              'updatedBy',
              'createdBy',
              'createdAt',
              'updatedAt',
            ],
          },
        ]
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
      const result = await this.companyRepositories.create({
        name: params.name,
        categoryParentId: params.categoryParentId,
        categoryType: params.categoryType,
        createdBy: params.createdBy,
        unit: params.unit
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

  async update(params: UpdateRequestCategory, id: number): Promise<UpdateResponse> {
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

  async remove(id: number): Promise<RemoveResponse> {
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
