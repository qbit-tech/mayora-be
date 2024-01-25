import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ManualCollectionModel } from './manualCollection.entity';
import {
  FindAllRequest,
  FindAllResponse,
  FindOneRequest,
  CreateRequestManualCollection,
  CreateResponse,
  UpdateRequestManualCollection,
  UpdateResponse,
  EditStatusProps,
  ICompanyListItem,
  RemoveResponse,
  RemoveRequest,
} from './contract';
import { getLikeOp } from '../../helpers/db';
import { v4 as uuidv4 } from 'uuid';
import { CategoryService } from '../category/category.service';
import { CategoryParentModel } from '../categoryParent/categoryParent.entity';
import { CategoryModel } from '../category/category.entity';

@Injectable()
export class ManualCollectionService {
  constructor(
    @InjectModel(ManualCollectionModel)
    private readonly companyRepositories: typeof ManualCollectionModel,
    private readonly categoryService: CategoryService,
  ) { }


  async findOne(params: FindOneRequest): Promise<ICompanyListItem> {
    try {
      const result = await this.companyRepositories.findOne({
        where: { id: params.id },
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

  async findDetailByIdShift(categoryId: string, shift: string): Promise<ICompanyListItem> {
    try {
      const result = await this.companyRepositories.findOne({
        where: { categoryId: categoryId, shift: shift },
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
        include: [
          {
            model: CategoryModel,
            as: 'categoryParent',
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

  async create(params: CreateRequestManualCollection): Promise<CreateResponse> {
    try {
      const category = await this.categoryService.findOne({ id: params.categoryId });

      if (
        category === null || category.categoryType !== 'manualcollection'
      ) {
        throw new HttpException(
          {
            status: 'ERR_COMPANY_REQUEST',
            message: 'This category do not have type manual collection',
            payload: null,
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const result = await this.companyRepositories.create({
        id: uuidv4(),
        machineId: params.machineId,
        categoryId: params.categoryId,
        createdBy: params.createdBy,
        value: params.value,
        shift: params.shift,
        remark: params.remark
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

  async update(params: UpdateRequestManualCollection, id: string): Promise<UpdateResponse> {
    try {
      const manualCollection = await this.companyRepositories.findOne({
        where: { id: id },
      });

      if (manualCollection === null) {
        throw new HttpException(
          {
            code: 'ERR_COMPANY_NOT_FOUND',
            message: 'company tidak tersedia',
            payload: null,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      const category = await this.categoryService.findOne({ id: params.categoryId });

      if (
        category === null || category.categoryType !== 'manualcollection'
      ) {
        throw new HttpException(
          {
            status: 'ERR_COMPANY_REQUEST',
            message: 'This category do not have type manual collection',
            payload: null,
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      manualCollection.machineId = params.machineId;
      manualCollection.categoryId = params.categoryId;
      manualCollection.value = params.value;
      manualCollection.shift = params.shift;
      manualCollection.remark = params.remark;
      manualCollection.updatedBy = params.updatedBy;
      await manualCollection.save();

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
