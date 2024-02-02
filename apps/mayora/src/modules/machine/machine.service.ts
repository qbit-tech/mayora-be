import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MachineModel } from './machine.entity';
import {
  FindAllRequest,
  FindAllResponse,
  FindOneRequest,
  CreateRequest,
  CreateResponse,
  UpdateRequest,
  UpdateResponse,
  ICompanyListItem,
  RemoveResponse,
} from './contract';
import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import sequelize from 'sequelize';
import { TroubleModel } from '../trouble/trouble.entity';
import { CategoryModel } from '../category/category.entity';
import { StartupModel } from '../startup/startup.entity';
import { StatusMachineModel } from '../statusMachine/statusMachine.entity';
import { UserModel } from '../user/user.entity';

@Injectable()
export class MachineService {
  constructor(
    @InjectModel(MachineModel)
    private readonly machineRepositories: typeof MachineModel,
  ) { }

  async findAll(params: FindAllRequest): Promise<FindAllResponse> {
    try {
      const where = {};

      const result = await this.machineRepositories.findAll({
        where,
        attributes: [
          'id',
          'name',
          'updatedBy',
          'createdBy',
          'createdAt',
          'updatedAt',
        ],
        offset: params.offset,
        limit: params.limit,
      });
      const count = await this.machineRepositories.count({ where });
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

  async getProduction(machineId: number, date: string): Promise<FindAllResponse> {
    try {
      const createdAt = {
        [Op.between]: [
          sequelize.literal(`'${date} 00:00:00.000+07'::timestamptz`),
          sequelize.literal(`'${date} 23:59:59.999+07'::timestamptz`)
        ]
      }
      const where = {
        id: machineId,
      };

      const result = await this.machineRepositories.findOne({
        where,
        attributes: [
          'id',
          'name',
        ],
        include: [
          {
            model: TroubleModel,
            where: { createdAt: createdAt },
            as: 'trouble',
            required: false,
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
                model: UserModel,
                as: 'user',
                attributes: [
                  'userId',
                  'name',
                ],
              },
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
          },
          {
            model: StartupModel,
            as: 'startup',
            where: { createdAt: createdAt },
            required: false,
            attributes: [
              'id',
              'startTime',
              'endTime',
              'machineId',
              'updatedBy',
              'createdBy',
              'createdAt',
              'updatedAt',
            ],
          },
          {
            model: StatusMachineModel,
            as: 'statusMachine',
            where: { createdAt: createdAt },
            required: false,
            attributes: [
              'id',
              'status',
              'machineId',
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
          status: 'ERR_COMPANY_REQUEST',
          message: error.message,
          payload: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async create(params: CreateRequest): Promise<CreateResponse> {
    try {
      const result = await this.machineRepositories.create({
        name: params.name,
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

  // async update(params: UpdateRequest, id: number): Promise<UpdateResponse> {
  //   try {
  //     const trouble = await this.machineRepositories.findOne({
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

  //     trouble.machineId = params.machineId;
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

  async remove(id: number): Promise<RemoveResponse> {
    try {
      const shipment = await this.machineRepositories.findOne({
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
