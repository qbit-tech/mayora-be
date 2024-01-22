import { Injectable, HttpException, HttpStatus, ConsoleLogger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductionTargetModel } from './productionTarget.entity';
import { UserModel } from '../user/user.entity';
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

@Injectable()
export class ProductionTargetService {
    constructor(
        @InjectModel(ProductionTargetModel)
        private readonly companyRepositories: typeof ProductionTargetModel,
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

            // let result = await UserModel.findAll({
            //     attributes: [
            //         'userId',
            //         'name',
            //         'roleId',
            //     ],
            //     offset: params.offset,
            //     limit: params.limit,
            //     include: [{
            //         where: whereCondition,
            //         model: this.companyRepositories,
            //     }]
            // })



            const result = await this.companyRepositories.findAll({
                where: whereCondition,
                attributes: [
                  'id',
                  'machineId',
                  'target',
                  'activeTarget',
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
                    as: 'createdByUser',                
                }],
              });
              

            const count = await this.companyRepositories.count({ where: whereCondition, distinct: true });

            const mappedResult = result.map(item => {
                const productionTarget = item.get();
                const createdByUser = productionTarget.createdByUser ? productionTarget.createdByUser.get() : null;
              
                // Exclude the createdByUser field and directly include its properties
                delete productionTarget.createdByUser;
              
                // Combine the properties into a new object
                return {
                  ...productionTarget,
                  userId: createdByUser ? createdByUser.userId : null,
                  name: createdByUser ? createdByUser.name : null,
                  role: createdByUser ? createdByUser.roleId : null,
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

    async findOne(params: FindOneRequest): Promise<ProductionTargetModel> {
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
                target: params.target,
                activeTarget: params.activeTarget,
                createdBy: params.createdBy,
                updatedBy: params.updatedBy,
            });
            console.log("1",result)

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
            const ProductionTarget = await this.companyRepositories.findOne({
                where: { id: id },
            });

            if (ProductionTarget === null) {
                throw new HttpException(
                    {
                        code: 'ERR_COMPANY_NOT_FOUND',
                        message: 'company tidak tersedia',
                        payload: null,
                    },
                    HttpStatus.NOT_FOUND,
                );
            }

            ProductionTarget.machineId = params.machineId;
            ProductionTarget.target = params.target;
            ProductionTarget.activeTarget = params.activeTarget;
            await ProductionTarget.save();

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
