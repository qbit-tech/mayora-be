import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RoleModel } from '@qbit-tech/libs-role';
import { UserModel, UserProperties } from '../user/user.entity';
import { verify } from 'jsonwebtoken';
import { SessionService } from '@qbit-tech/libs-authv3';
import { DEFAULT_HASH_TOKEN } from '../../core/constants';
import { RoleService } from '@qbit-tech/libs-role';
import { EPlatform } from 'apps/mayora/src/core/constants';

@Injectable()
export class AuthSessionService {
  private readonly logger = new Logger(AuthSessionService.name);

  constructor(
    @InjectModel(UserModel)
    private readonly userRepositories: typeof UserModel,
    private readonly sessionService: SessionService,
    private readonly roleService: RoleService,
  ) {}

  async findOneByUserId(userId: string): Promise<UserProperties> {
    let result:any = await this.userRepositories.findOne({
      where: { userId },
      include: [
        // {
        //   model: RoleModel,
        //   as: 'roles',
        // },
      ],
    });

    if(result.roleId) {
      const getRole = await this.roleService.findOne(result.roleId)

      if(getRole) {
        result = {
          ...result.get(),
          role: getRole
        }
      } else {
        result = result.get()
      }
    } else {
      result = result.get()
    }

    return result ? result : null;
  }

  async validateToken(token: string) {
    let decodedToken: any = {
      sessionId: 'invalidSessionId',
    };

    if (token) {
      try {
        decodedToken = verify(
          token,
          process.env.SESSION_HASH_TOKEN || DEFAULT_HASH_TOKEN,
          {
            algorithms: ['HS256'],
          },
        ) as any;
      } catch (err) {
        //
      }
    }
    const userFromSession = await this.sessionService.getSession(
      decodedToken.sessionId,
    );
    if (userFromSession) {
      console.info(
        '(userFromSession as any).userId',
        (userFromSession as any).userId,
      );
      console.info(
        '(userFromSession as any).platform',
        (userFromSession as any).platform,
      );
      console.info('decodedToken', decodedToken)

      let latestSessionId;
      if ((userFromSession as any).platform === EPlatform.CMS) {
        // latestSessionId = await this.sessionService.getLatestSessionIdByKey(
        //   'auth_' +
        //     (userFromSession as any).platform +
        //     '_' +
        //     (userFromSession as any).userId,
        // );

        // console.info('latestSessionId', latestSessionId);
        // const user = await this.findOneByUserId(
        //   (userFromSession as any).userId,
        // );

        return { decodedToken, userFromSession, user: decodedToken.user };
      } else {
        // check is latest session, kick old session
        latestSessionId = await this.sessionService.getLatestSessionIdByKey(
          'auth_' + (userFromSession as any).userId,
        );
      }

      console.info('latestSessionId', latestSessionId);

      if (!latestSessionId) {
        return null;
      }

      if (latestSessionId !== decodedToken.sessionId) {
        return null;
      }
      // end check

      const user = decodedToken.user ??
      {
        method: userFromSession.method,
        username: userFromSession.username,
        userId: userFromSession.userId,
      }
      // const user = await this.findOneByUserId((userFromSession as any).userId);
      console.log(user)
      return { decodedToken, userFromSession, user };
    } else {
      return null;
    }
  }
}
