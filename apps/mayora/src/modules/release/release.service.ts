import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ReleaseModel } from './release.entity';
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
import { generateResultPagination } from '@qbit-tech/libs-utils';
import { Op } from 'sequelize';

@Injectable()
export class ReleaseService {
  constructor(
    @InjectModel(ReleaseModel)
    private readonly companyRepositories: typeof ReleaseModel,
  ) { }

  async findAll(params: FindAllRequest): Promise<FindAllResponse> {
    try {
      const result = await this.companyRepositories.findAll({
        attributes: [
          'id',
          'machineId',
          'amount',
          'time',
          'shift',
          'createdAt',
          'updatedAt',
        ],
        offset: params.offset,
        limit: params.limit,
      });

      const count = await this.companyRepositories.count({ distinct: true });

      return {
        ...generateResultPagination(count, params),
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

  async findOne(params: FindOneRequest): Promise<ReleaseModel> {
    try {
      const result = await this.companyRepositories.findOne({
        where: {
          id: params.id,
        },
        attributes: [
          'id',
          'machineId',
          'amount',
          'time',
          'shift',
          'createdAt',
          'updatedAt',
        ],
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
      const result = await this.companyRepositories.create({
        id: uuidv4(),
        machineId: 'hgyui87yui8765ertfghjui',
        amount: params.amount,
        time: params.time,
        shift: params.shift,
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
      const release = await this.companyRepositories.findOne({
        where: { id: id },
      });

      if (release === null) {
        throw new HttpException(
          {
            code: 'ERR_COMPANY_NOT_FOUND',
            message: 'company tidak tersedia',
            payload: null,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      release.machineId = params.machineId;
      release.amount = params.amount;
      release.time = params.time;
      release.shift = params.shift;
      await release.save();

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
      const release = await this.companyRepositories.findOne({
        where: { id: id },
      });

      if (release === null) {
        throw new HttpException(
          {
            code: 'ERR_COMPANY_NOT_FOUND',
            message: 'company tidak tersedia',
            payload: null,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      await release.destroy();

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



}