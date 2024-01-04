import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { generateResultPagination } from '../../utils/generateResultPagination';
import * as crypto from 'crypto';
import { UserModel } from './user.entity';
import { NewUserRequest, UserProperties } from './user.contract';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel)
    private readonly userRepositories: typeof UserModel,
  ) {}

  async create(user: UserProperties): Promise<UserProperties> {
    try {
      const result = await this.userRepositories.create(user);
      return result ? result.get() : null;
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
      const [num, result]  = await this.userRepositories.update(
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
      const result = await this.userRepositories.destroy(
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
    results: UserProperties[];
  }> {
    try {
      const count = await this.userRepositories.count();
      const results = await this.userRepositories.findAll({
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

  async findOneUser(id: string): Promise<UserProperties> {
    try {
      const result = await this.userRepositories.findOne({
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

  async generateNewSession(
    user: UserProperties,
    platform: string,
  ): Promise<{
    expired: Date;
    session: string;
  }> {
    try {
      const today = new Date();
      const expDate = new Date(new Date().setDate(today.getDate() + 30));
      if (platform == 'web') {
        const sessionId = crypto.createHmac('sha256', process.env.RANDOM_SESSION_KEY || '2r8u32niejf')
          .update(`${user.id}-${Date.now}-web`)
          .digest('hex');
        return { expired: expDate, session: sessionId };
      } else if (platform == 'mobile') {
        const sessionId = crypto
          .createHmac('sha256', process.env.RANDOM_SESSION_KEY || '2r8u32niejf')
          .update(`${user.id}-${Date.now}-mobile`)
          .digest('hex');
        return { expired: expDate, session: sessionId };
      } else {
        return null;
      }
    } catch (error) {
      Logger.error(error)
      return Promise.reject(error)
    }
  }


  async findOneUserByEmail(email: string): Promise<UserProperties> {
    try {
      const result = await this.userRepositories.findOne({
        where: {
          email: email,
        },
      });
      return result ? result.get() : null;  
    } catch (error) {
      Logger.error(error)
      return Promise.reject(error)
    }
  }
}
