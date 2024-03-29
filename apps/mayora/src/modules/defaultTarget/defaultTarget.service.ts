import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DefaultTargetModel } from './defaultTarget.entity';

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
import moment from 'moment';
import { DefaultTargetModelLog } from './defaultTargetLog.entity';


@Injectable()
export class defaultTargetService {
    constructor(
        @InjectModel(DefaultTargetModel)
        private readonly companyRepositories: typeof DefaultTargetModel,
    ) { }

    async findAll(params: FindAllRequest): Promise<FindAllResponse> {
        try {
            let whereCondition;
            moment.locale('id')
            if (params.machineId) {
                whereCondition = {
                    [Op.and]: [
                        { machineId: params.machineId ? params.machineId : "" },
                        {
                            createdAt: params.createdAt ? {
                                [Op.between]: [
                                    new Date(params.createdAt),
                                    new Date(params.createdAt + 'T23:59:59.999Z'),
                                ]
                            } :
                                {
                                    [Op.between]: [
                                        new Date('2021-01-01T00:00:00.000Z'),
                                        new Date(moment().utc().format())
                                    ]
                                }
                        }
                    ],
                }
            } else {
                whereCondition = {
                    [Op.or]: [
                        { machineId: params.machineId ? params.machineId : "" },
                        {
                            createdAt: params.createdAt ? {
                                [Op.between]: [
                                    new Date(params.createdAt),
                                    new Date(params.createdAt + 'T23:59:59.999Z'),
                                ]
                            } :
                                {
                                    [Op.between]: [
                                        new Date('2021-01-01T00:00:00.000Z'),
                                        new Date(moment().utc().format())
                                    ]
                                }
                        }
                    ],
                }
            }


            const result = await this.companyRepositories.findAll({
                where: whereCondition,
                attributes: [
                    'id',
                    'machineId',
                    'target',
                    'createdBy',
                    'updatedBy',
                    'createdAt',
                    'updatedAt',
                ],
                order: [
                    ['createdAt', 'DESC']
                ],
                offset: params.offset,
                limit: params.limit,
            });

            const count = await this.companyRepositories.count({ where: whereCondition, distinct: true });

            return {
                ...generateResultPagination(count, params),
                results: result.map(item => item.get()),
            };
        } catch (error) {
            throw new HttpException(
                {
                    status: 'ERR_COMPANY_REQUEST',
                    message: [error, error.messagge],
                    payload: null,
                },
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async findOne(params: FindOneRequest): Promise<DefaultTargetModel> {
        try {
            const result = await this.companyRepositories.findOne({
                where: {
                    id: params.id,
                },
                attributes: [
                    'id',
                    'machineId',
                    'target',
                    'createdAt',
                    'createdBy',
                    'updatedAt',
                    'updatedBy',
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
            const generateId = uuidv4();
            const result = await this.companyRepositories.create({
                id: generateId,
                machineId: params.machineId,
                target: params.target,
                createdBy: params.createdBy,
                updatedBy: params.updatedBy,
            });
            console.log("1", result)

            const resultLog = await DefaultTargetModelLog.create({
                id: uuidv4(),
                defaultTargetId: generateId,
                machineId: params.machineId,
                target: params.target,
                createdBy: params.createdBy,
                updatedBy: params.updatedBy,
            });
            console.log("2", resultLog)

            return { isSuccess: result ? true : false };
        } catch (error) {
            throw new HttpException(
                {
                    status: 'ERR_COMPANY_REQUEST',
                    message: [error, error.message],
                    payload: null,
                },
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async update(params: UpdateRequest, id: string): Promise<UpdateResponse> {
        try {
            const DefaultTarget = await this.companyRepositories.findOne({
                where: { id: id },
            });

            if (DefaultTarget === null) {
                throw new HttpException(
                    {
                        code: 'ERR_COMPANY_NOT_FOUND',
                        message: 'company tidak tersedia',
                        payload: null,
                    },
                    HttpStatus.NOT_FOUND,
                );
            }

            // DefaultTarget.machineId = params.machineId;
            // DefaultTarget.target = params.target;
            // await DefaultTarget.save();

            await DefaultTarget.destroy();

            const generateId = uuidv4();
            const result = await this.companyRepositories.create({
                id: generateId,
                machineId: params.machineId,
                target: params.target,
                createdBy: params.createdBy,
                updatedBy: params.updatedBy,
            });

            const resultLog = await DefaultTargetModelLog.create({
                id: uuidv4(),
                defaultTargetId: generateId,
                machineId: params.machineId,
                target: params.target,
                createdBy: params.createdBy,
                updatedBy: params.updatedBy,
            });

            console.log("1", result)
            console.log("2", resultLog)

            return {
                isSuccess: true,
                id: generateId,
            };

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
            const defaulttarget = await this.companyRepositories.findOne({
                where: { id: id },
            });

            if (defaulttarget === null) {
                throw new HttpException(
                    {
                        code: 'ERR_COMPANY_NOT_FOUND',
                        message: 'company tidak tersedia',
                        payload: null,
                    },
                    HttpStatus.NOT_FOUND,
                );
            }

            await defaulttarget.destroy();

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

    async findAllLog(params: FindAllRequest): Promise<FindAllResponse> {

        try {
            const result = await DefaultTargetModelLog.findAll({
                attributes: [
                    'id',
                    'target',
                    'activeTarget',
                    'createdBy',
                    'updatedBy',
                    'createdAt',
                    'updatedAt',
                ],
                order: [
                    ['createdAt', 'DESC']
                ],
                offset: params.offset,
                limit: params.limit,
            });

            // console.log("result",result[0].updatedByUser.role)

            const count = await DefaultTargetModelLog.count({ distinct: true });

            return {
                ...generateResultPagination(count, params),
                results: result.map(item => item.get()),
            };
        } catch (error) {

            throw new HttpException(
                {
                    status: 'ERR_COMPANY_REQUEST',
                    message: [error, error.message],
                    payload: null,
                },
                HttpStatus.BAD_REQUEST,
            );
        }

    }

}
