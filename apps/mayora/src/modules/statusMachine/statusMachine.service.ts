import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { StatusMachineModel } from './statusMachine.entity';
import {
  FindAllRequest,
  FindAllResponse,
  FindOneRequest,
  CreateRequestStatusMachine,
  CreateResponse,
  UpdateRequestStatusMachine,
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
export class StatusMachineService {
  constructor(
    @InjectModel(StatusMachineModel)
    private readonly companyRepositories: typeof StatusMachineModel,
  ) { }

  async findAll(params: FindAllRequest): Promise<FindAllResponse> {
    try {
      const where = {};

      const result = await this.companyRepositories.findAll({
        where,
        attributes: [
          'id',
          'status',
          'machineId',
          'updatedBy',
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

  // async findOne(params: FindOneRequest): Promise<ICompanyListItem> {
  //   try {
  //     const result = await this.companyRepositories.findOne({
  //       where: { id: params.id },
  //       attributes: [
  //         'id',
  //         'name',
  //         'statusMachineParentId',
  //         'statusMachineType',
  //         'updatedBy',
  //         'unit',
  //         'createdBy',
  //         'createdAt',
  //         'updatedAt'
  //       ],
  //       include: [
  //         {
  //           model: ManualCollectionModel,
  //           as: 'manualCollection',
  //           attributes: [
  //             'id',
  //             'machineId',
  //             'statusMachineId',
  //             'shift',
  //             'value',
  //             'remark',
  //             'updatedBy',
  //             'createdBy',
  //             'createdAt',
  //             'updatedAt',
  //           ],
  //         },
  //       ]
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

  // async findOneByMachine(params: FindOneByMachineRequest): Promise<ICompanyListItem> {
  //   try {
  //     const result = await this.companyRepositories.findOne({
  //       where: { id: params.id },
  //       attributes: [
  //         'id',
  //         'name',
  //         'statusMachineParentId',
  //         'statusMachineType',
  //         'updatedBy',
  //         'unit',
  //         'createdBy',
  //         'createdAt',
  //         'updatedAt'
  //       ],
  //       include: [
  //         {
  //           model: ManualCollectionModel,
  //           where: { machineId: params.machineId },
  //           as: 'manualCollection',
  //           required: false,
  //           attributes: [
  //             'id',
  //             'machineId',
  //             'statusMachineId',
  //             'shift',
  //             'value',
  //             'remark',
  //             'updatedBy',
  //             'createdBy',
  //             'createdAt',
  //             'updatedAt',
  //           ],
  //         },
  //       ]
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

  async create(params: CreateRequestStatusMachine): Promise<CreateResponse> {
    try {
      const result = await this.companyRepositories.create({
        status: params.status,
        machineId: params.machineId,
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

  // async update(params: UpdateRequestStatusMachine, id: number): Promise<UpdateResponse> {
  //   try {
  //     const statusMachine = await this.companyRepositories.findOne({
  //       where: { id: id },
  //     });

  //     if (statusMachine === null) {
  //       throw new HttpException(
  //         {
  //           code: 'ERR_COMPANY_NOT_FOUND',
  //           message: 'company tidak tersedia',
  //           payload: null,
  //         },
  //         HttpStatus.NOT_FOUND,
  //       );
  //     }

  //     statusMachine.name = params.name;
  //     statusMachine.unit = params.unit;
  //     statusMachine.statusMachineType = params.statusMachineType;
  //     statusMachine.updatedBy = params.updatedBy;
  //     await statusMachine.save();

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
