import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TroubleModel } from './trouble.entity';
import {
  FindAllRequest,
  FindAllResponse,
  FindOneRequest,
  CreateRequestTrouble,
  CreateResponse,
  UpdateRequest,
  UpdateResponse,
  ICompanyListItem,
  RemoveResponse,
} from './contract';
import { v4 as uuidv4 } from 'uuid';
import { CategoryModel } from '../category/category.entity';

@Injectable()
export class TroubleService {
  constructor(
    @InjectModel(TroubleModel)
    private readonly companyRepositories: typeof TroubleModel,
  ) { }

  async findAll(params: FindAllRequest): Promise<FindAllResponse> {
    try {
      const where = {};

      const result = await this.companyRepositories.findAll({
        where,
        attributes: [
          'id',
          'machineId',
          'categoryId',
          'startTime',
          'endTime',
          'remark',
          'updatedBy',
          'status',
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

  async findAllByMachine(machineId: string): Promise<FindAllResponse> {
    try {
      const where = { machineId: machineId };

      const result = await this.companyRepositories.findAll({
        where,
        attributes: [
          'id',
          'machineId',
          'categoryId',
          'startTime',
          'endTime',
          'remark',
          'updatedBy',
          'status',
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

  async findOneTrouble(params: FindOneRequest): Promise<ICompanyListItem> {
    try {
      const result = await this.companyRepositories.findOne({
        where: { id: params.id },
        attributes: [
          'id',
          'machineId',
          'categoryId',
          'startTime',
          'endTime',
          'remark',
          'updatedBy',
          'status',
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

  async create(params: CreateRequestTrouble): Promise<CreateResponse> {
    try {
      const result = await this.companyRepositories.create({
        id: uuidv4(),
        machineId: params.machineId,
        categoryId: params.categoryId,
        startTime: params.startTime,
        endTime: params.endTime,
        remark: params.remark,
        createdBy: params.createdBy,
        status: "active"
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

  async update(params: UpdateRequest, id: string): Promise<UpdateResponse> {
    try {
      const trouble = await this.companyRepositories.findOne({
        where: { id: id },
      });

      if (trouble === null) {
        throw new HttpException(
          {
            code: 'ERR_COMPANY_NOT_FOUND',
            message: 'company tidak tersedia',
            payload: null,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      trouble.machineId = params.machineId;
      trouble.categoryId = params.categoryId;
      trouble.startTime = params.startTime;
      trouble.endTime = params.endTime;
      trouble.remark = params.remark;
      trouble.status = params.status;
      trouble.updatedBy = params.updatedBy;
      await trouble.save();

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
