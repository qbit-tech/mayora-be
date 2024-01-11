import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ManualCollectionModel } from './manualCollection.entity';
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
export class ManualCollectionService {
  constructor(
    @InjectModel(ManualCollectionModel)
    private readonly companyRepositories: typeof ManualCollectionModel,
  ) { }

  // async findAll(params: FindAllRequest): Promise<FindAllResponse> {
  //   try {
  //     const where = {};
  //     console.log('hgftyuijkhgft')

  //     const result = await this.companyRepositories.findAll({
  //       where,
  //       attributes: [
  //         'id',
  //         'name',
  //         'manualCollectionParentId',
  //         'manualCollectionType',
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
          'manualCollectionParentId',
          'manualCollectionType',
          'updatedBy',
          'status',
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
        machineId: 'hgyui87yui8765ertfghjui',
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

  async update(params: UpdateRequest, id: string): Promise<UpdateResponse> {
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