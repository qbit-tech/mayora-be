import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OEETargetModel } from './oeeTarget.entity';
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
import { AuthPermissionGuard } from '../../core/auth.guard';
import { UserModel } from '../user/user.entity';
import { OEETargetLogModel } from './oeeTargetLog.entity';
import { RoleModel } from '@qbit-tech/libs-role';

@Injectable()
export class oeeTargetService {
    constructor(
        @InjectModel(OEETargetModel)
        private readonly companyRepositories: typeof OEETargetModel,
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
                order : [
                    [ 'createdAt' , 'DESC' ]
                ],
                offset: params.offset,
                limit: params.limit,
                include: [{
                    model: UserModel,
                    attributes: ['userId', 'name', 'roleId'],
                    as: 'updatedByUser',
                    include: [{
                        model: RoleModel,
                        attributes: ['roleName'],
                        as: 'role',   
                    }],    
                }],
            });

            const count = await this.companyRepositories.count({ where: whereCondition, distinct: true });

            const mappedResult = result.map(item => {
                const productionTarget = item.get();
                const updatedByUser = productionTarget.updatedByUser ? productionTarget.updatedByUser.get() : null;

                // Exclude the updatedByUser field and directly include its properties
                delete productionTarget.updatedByUser;

                // Combine the properties into a new object
                return {
                    ...productionTarget,
                    userId: updatedByUser ? updatedByUser.userId : null,
                    name: updatedByUser ? updatedByUser.name : null,
                    role: updatedByUser ? updatedByUser.role ? updatedByUser.role.roleName : null : null,
                };
            });

            return {
                ...generateResultPagination(count, params),
                results: mappedResult,
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

    async findOne(params: FindOneRequest): Promise<OEETargetModel> {
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
            console.log("1",result)
            const resultLog = await OEETargetLogModel.create({
                id: uuidv4(),
                ORRTargetId: generateId,
                machineId: params.machineId,
                target: params.target,
                createdBy: params.createdBy,
                updatedBy: params.updatedBy,
            });
            console.log("2",resultLog)

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
            const OeeTarget = await this.companyRepositories.findOne({
                where: { id: id },
            });

            if (OeeTarget === null) {
                throw new HttpException(
                    {
                        code: 'ERR_COMPANY_NOT_FOUND',
                        message: 'company tidak tersedia',
                        payload: null,
                    },
                    HttpStatus.NOT_FOUND,
                );
            }

            // OeeTarget.machineId = params.machineId;
            // OeeTarget.target = params.target;
            // await OeeTarget.save();

            await OeeTarget.destroy();

            const generateId = uuidv4();
            const result = await this.companyRepositories.create({
                id: generateId,
                machineId: params.machineId,
                target: params.target,
                createdBy: params.createdBy,
                updatedBy: params.updatedBy,
            });

            const resultLog = await OEETargetLogModel.create({
                id: uuidv4(),
                ORRTargetId: generateId,
                machineId: params.machineId,
                target: params.target,
                createdBy: params.createdBy,
                updatedBy: params.updatedBy,
            });

            console.log("1",result)
            console.log("2",resultLog)

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
            const oee = await this.companyRepositories.findOne({
                where: { id: id },
            });

            if (oee === null) {
                throw new HttpException(
                    {
                        code: 'ERR_COMPANY_NOT_FOUND',
                        message: 'company tidak tersedia',
                        payload: null,
                    },
                    HttpStatus.NOT_FOUND,
                );
            }

            await oee.destroy();

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
            const result = await OEETargetLogModel.findAll({
                attributes: [
                    'id',
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
                include: [{
                    model: UserModel,
                    attributes: ['userId', 'name', 'roleId'],
                    as: 'updatedByUser',
                    include: [{
                        model: RoleModel,
                        attributes: ['roleName'],
                        as: 'role',
                    }],
                }],
            });

            // console.log("result",result[0].updatedByUser.role)

            const count = await OEETargetLogModel.count({ distinct: true });

            const mappedResult = result.map(item => {
                const oeeTarget = item.get();
                const updatedByUser = oeeTarget.updatedByUser ? oeeTarget.updatedByUser.get() : null;

                // Exclude the createdByUser field and directly include its properties
                delete oeeTarget.updatedByUser;

                // Combine the properties into a new object
                return {
                    ...oeeTarget,
                    userId: updatedByUser ? updatedByUser.userId : null,
                    name: updatedByUser ? updatedByUser.name : null,
                    role: updatedByUser ? updatedByUser.role ? updatedByUser.role.roleName : null : null,
                };
            });

            return {
                ...generateResultPagination(count, params),
                results: mappedResult,
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
