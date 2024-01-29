import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CategoryParentModel } from './categoryParent.entity';
import {
  FindAllRequest,
  FindAllResponse,
  FindOneRequest,
  CreateRequestCategoryParent,
  CreateResponse,
  UpdateRequestCategoryParent,
  UpdateResponse,
  EditStatusProps,
  ICompanyListItem,
  RemoveResponse,
  RemoveRequest,
} from './contract';
import { getLikeOp } from '../../helpers/db';
import { v4 as uuidv4 } from 'uuid';
import { CategoryModel } from '../category/category.entity';
import { ManualCollectionModel } from '../manualCollection/manualCollection.entity';
import { Op } from 'sequelize';
import { TroubleModel } from '../trouble/trouble.entity';

@Injectable()
export class CategoryParentService {
  constructor(
    @InjectModel(CategoryParentModel)
    private readonly companyRepositories: typeof CategoryParentModel,
  ) { }

  async findAll(): Promise<FindAllResponse> {
    try {
      const where = { categoryLevel: 'level1' };

      const result = await this.companyRepositories.findAll({
        where,
        attributes: [
          'id',
          'name',
          'categoryParentId',
          'categoryLevel',
          'updatedBy',
          'createdBy',
          'createdAt',
          'updatedAt',
        ],
        include: [
          {
            model: CategoryParentModel,
            as: 'children',
            order: [
              ['createdAt', 'desc'],
            ],
            attributes: [
              'id',
              'name',
              'categoryParentId',
              'categoryLevel',
              'updatedBy',
              'createdBy',
              'createdAt',
              'updatedAt',
            ],
            include: [
              {
                model: CategoryParentModel,
                as: 'children',
                order: [
                  ['createdAt', 'desc'],
                ],
                attributes: [
                  'id',
                  'name',
                  'categoryParentId',
                  'categoryLevel',
                  'updatedBy',
                  'createdBy',
                  'createdAt',
                  'updatedAt',
                ],
                include: [
                  {
                    model: CategoryParentModel,
                    as: 'children',
                    order: [
                      ['createdAt', 'desc'],
                    ],
                    attributes: [
                      'id',
                      'name',
                      'categoryParentId',
                      'categoryLevel',
                      'updatedBy',
                      'createdBy',
                      'createdAt',
                      'updatedAt',
                    ],
                    include: [
                      {
                        model: CategoryModel,
                        as: 'level5',
                        order: [
                          ['createdAt', 'desc'],
                        ],
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
                    ],
                  },
                  {
                    model: CategoryModel,
                    as: 'level5',
                    order: [
                      ['createdAt', 'desc'],
                    ],
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
                ],
              },
              {
                model: CategoryModel,
                as: 'level5',
                order: [
                  ['createdAt', 'desc'],
                ],
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
            ],
          },
          {
            model: CategoryModel,
            as: 'level5',
            order: [
              ['createdAt', 'desc'],
            ],
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
        ],
        order: [
          ['createdAt', 'desc'],
        ],
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

  async findAllManualCollection(): Promise<FindAllResponse> {
    try {
      const where = { categoryLevel: 'level1' };

      const result = await this.companyRepositories.findAll({
        where,
        attributes: [
          'id',
          'name',
          'categoryParentId',
          'categoryLevel',
          'updatedBy',
          'createdBy',
          'createdAt',
          'updatedAt',
        ],
        include: [
          {
            model: CategoryParentModel,
            as: 'children',
            order: [
              ['createdAt', 'desc'],
            ],
            attributes: [
              'id',
              'name',
              'categoryParentId',
              'categoryLevel',
              'updatedBy',
              'createdBy',
              'createdAt',
              'updatedAt',
            ],
            include: [
              {
                model: CategoryParentModel,
                as: 'children',
                order: [
                  ['createdAt', 'desc'],
                ],
                attributes: [
                  'id',
                  'name',
                  'categoryParentId',
                  'categoryLevel',
                  'updatedBy',
                  'createdBy',
                  'createdAt',
                  'updatedAt',
                ],
                include: [
                  {
                    model: CategoryParentModel,
                    as: 'children',
                    order: [
                      ['createdAt', 'desc'],
                    ],
                    attributes: [
                      'id',
                      'name',
                      'categoryParentId',
                      'categoryLevel',
                      'updatedBy',
                      'createdBy',
                      'createdAt',
                      'updatedAt',
                    ],
                    include: [
                      {
                        model: CategoryModel,
                        as: 'level5',
                        where: { categoryType: 'manualcollection' },
                        required: false,
                        order: [
                          ['createdAt', 'desc'],
                        ],
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
                      },
                    ],
                  },
                  {
                    model: CategoryModel,
                    as: 'level5',
                    where: { categoryType: 'manualcollection' },
                    required: false,
                    order: [
                      ['createdAt', 'desc'],
                    ],
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
                  },
                ],
              },
              {
                model: CategoryModel,
                as: 'level5',
                where: { categoryType: 'manualcollection' },
                required: false,
                order: [
                  ['createdAt', 'desc'],
                ],
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
              },
            ],
          },
          {
            model: CategoryModel,
            as: 'level5',
            where: { categoryType: 'manualcollection' },
            required: false,
            order: [
              ['createdAt', 'desc'],
            ],
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
          },
        ],
        order: [
          ['createdAt', 'desc'],
        ],
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

  async findAllTrouble(): Promise<FindAllResponse> {
    try {
      const where = { categoryLevel: 'level1' };

      const result = await this.companyRepositories.findAll({
        where,
        attributes: [
          'id',
          'name',
          'categoryParentId',
          'categoryLevel',
          'updatedBy',
          'createdBy',
          'createdAt',
          'updatedAt',
        ],
        include: [
          {
            model: CategoryParentModel,
            as: 'children',
            order: [
              ['createdAt', 'desc'],
            ],
            attributes: [
              'id',
              'name',
              'categoryParentId',
              'categoryLevel',
              'updatedBy',
              'createdBy',
              'createdAt',
              'updatedAt',
            ],
            include: [
              {
                model: CategoryParentModel,
                as: 'children',
                order: [
                  ['createdAt', 'desc'],
                ],
                attributes: [
                  'id',
                  'name',
                  'categoryParentId',
                  'categoryLevel',
                  'updatedBy',
                  'createdBy',
                  'createdAt',
                  'updatedAt',
                ],
                include: [
                  {
                    model: CategoryParentModel,
                    as: 'children',
                    order: [
                      ['createdAt', 'desc'],
                    ],
                    attributes: [
                      'id',
                      'name',
                      'categoryParentId',
                      'categoryLevel',
                      'updatedBy',
                      'createdBy',
                      'createdAt',
                      'updatedAt',
                    ],
                    include: [
                      {
                        model: CategoryModel,
                        as: 'level5',
                        where: { categoryType: 'trouble' },
                        required: false,
                        order: [
                          ['createdAt', 'desc'],
                        ],
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
                    ],
                  },
                  {
                    model: CategoryModel,
                    as: 'level5',
                    where: { categoryType: 'trouble' },
                    required: false,
                    order: [
                      ['createdAt', 'desc'],
                    ],
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
                ],
              },
              {
                model: CategoryModel,
                as: 'level5',
                where: { categoryType: 'trouble' },
                required: false,
                order: [
                  ['createdAt', 'desc'],
                ],
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
            ],
          },
          {
            model: CategoryModel,
            as: 'level5',
            where: { categoryType: 'trouble' },
            required: false,
            order: [
              ['createdAt', 'desc'],
            ],
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
        ],
        order: [
          ['createdAt', 'desc'],
        ],
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
          'categoryLevel',
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

  async create(params: CreateRequestCategoryParent): Promise<CreateResponse> {
    try {
      const result = await this.companyRepositories.create({
        name: params.name,
        categoryParentId: params.categoryParentId,
        categoryLevel: params.categoryLevel,
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

  async update(params: UpdateRequestCategoryParent, id: number): Promise<UpdateResponse> {
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
      category.categoryLevel = params.categoryLevel;
      category.categoryParentId = params.categoryParentId;
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

  async remove(
    id: number,
  ): Promise<RemoveResponse> {
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
