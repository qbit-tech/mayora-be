import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { generateResultPagination } from '../../utils/generateResultPagination';
import { v4 as uuidv4 } from 'uuid';
import { RoleModel } from './role.entity';
import { NewRoleRequest, RoleProperties } from './role.contract';
import { Op } from 'sequelize';


@Injectable()
export class RoleService {
  constructor(
    @InjectModel(RoleModel)
    private readonly roleRepositories: typeof RoleModel,
  ) {}

  async create(role: NewRoleRequest): Promise<RoleProperties> {
    try {
      const result = await this.roleRepositories.create(role);
      return result ? result.get() : null;
    } catch (error) {
      Logger.error(error)
      return Promise.reject(error)
    }
  }

  async bulkCreate(role: NewRoleRequest[], name: string[]): Promise<RoleProperties[]> {
    try {
      const existRole:RoleProperties[] = await this.roleRepositories.findAll({
        where: {
          name: name
        }
      })
      console.log(existRole.length<1)
      if(existRole.length<1){
        const id = uuidv4()
        const currentDate: Date = new Date()
        let data:RoleProperties[] = role.map(x => ({
          ...x, 
          id: uuidv4(), 
          createdAt: currentDate,
          updatedAt: currentDate, 
          createdBy: id,
          updatedBy: id
        }))
        const result = await this.roleRepositories.bulkCreate(data);
        return result ? result : null;
      }
      return existRole;
    } catch (error) {
      Logger.error(error)
      return Promise.reject(error)
    }
  }

  async update({
    SLALevels,
    id,
  }: {
    SLALevels: any;
    id: string;
  }): Promise<boolean> {
    try {
      const [num, result]  = await this.roleRepositories.update(
        SLALevels,
        {
          where: {
            id : id,
          },
        },
      );
      if (result !== null) return true;
      else return false;
    } catch (error) {
      Logger.error(error)
      return Promise.reject(error)
    }
  }

  async delete({
    id,
  }: {
    id: string;
  }): Promise<number> {
    try {
      const result = await this.roleRepositories.destroy(
        {
          where: {
            id : id,
          },
        },
      );
      return result;
    } catch (error) {
      Logger.error(error)
      return Promise.reject(error)
    }
  }

  async findAll(params: { offset?: number; limit?: number }): Promise<{
    count: number;
    prev: string;
    next: string;
    results: RoleProperties[];
  }> {
    try {
      const count = await this.roleRepositories.count();
      const results = await this.roleRepositories.findAll({
        limit: params.limit,
        offset: params.offset,
      });

      Logger.log('findAll : ' + JSON.stringify(results), 'SLA Levels.service');

      return {
        ...generateResultPagination(count, params),
        results: results.map((row) => row.get()),
      };
    } catch (error) {
      Logger.error(
        'findAll SLA Levels::: error: ' + JSON.stringify(error),
        'SLA Levels.service',
        'SLA Levels.service',
      );
      return Promise.reject(error);
    }
  }

  async findOneRole(id: number): Promise<RoleProperties> {
    try {
      const result = await this.roleRepositories.findOne({
        where: {
          id: id,
        },
      });
      return result ? result.get() : null;  
    } catch (error) {
      Logger.error(error)
      return Promise.reject(error)
    }
  }
}
