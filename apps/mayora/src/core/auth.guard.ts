import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  mixin,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';

export const DEFAULT_HASH_TOKEN = '58n4984u0n98ur3';

export const AuthGuard = (role?: string | string[]) => {
  @Injectable()
  class AuthGuardMixin implements CanActivate {
    // constructor(readonly authService: AuthService) {}

    canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const response = context.switchToHttp().getResponse();

      return this.validateRequest(request, response);
    }

    async validateRequest(req: Request, res: Response): Promise<boolean> {
      const token = AuthGuardMixin.getToken(req);

      if (token) {
        // Verify jwt token
        let decodedJwt;

        jwt.verify(
          token,
          process.env.SESSION_HASH_TOKEN || DEFAULT_HASH_TOKEN,
          function (err, decoded) {
            decodedJwt = decoded;
          },
        );

        Logger.log(decodedJwt);

        // const user = await this.authService.verifyToken({
        //   token: decodedJwt.session,
        // });

        const user = null

        if (user === null) {
          throw new HttpException(
            {
              code: 'err_unauthorized',
              message: 'Authorization Failed',
            },
            HttpStatus.FORBIDDEN,
          );
        } else {

          const tokenExpired = new Date(user.user.dTokenMobileExp);
          const today = new Date();
          Logger.log(tokenExpired)
          Logger.log(today)
          Logger.log(token == user.user.vTokenMobile)
          Logger.log(token == user.user.vTokenWeb)
          if (token == user.user.vTokenMobile) {
            if (tokenExpired < today || user.user.dMobileVerified == null) {
              if (user.user.dEmailVerified == null) {
                throw new HttpException(
                  {
                    code: 'err_unauthorized',
                    message: 'Authorization Failed',
                  },
                  HttpStatus.FORBIDDEN,
                );
              }
            }
          } else if (token == user.user.vTokenWeb) {
            if (
              new Date(user.user.dTokenWebExp).getTime() <
                new Date().getTime() ||
              user.user.dEmailVerified == ''
            ) {
              throw new HttpException(
                {
                  code: 'err_unauthorized',
                  message: 'Authorization Failed',
                },
                HttpStatus.FORBIDDEN,
              );
            }
          }
        }

        const index =
          user.user.jMobileGUID.length == 0
            ? 0
            : user.user.jMobileGUID.length - 1;
        req['user'] = {
          sessionId: token,
          guid: user.user.jMobileGUID[index].vMobileGUID,
          ...user,
        };
        return true;
      } else {
        return false;
      }
    }

    static getToken(req: Request) {
      const header: any = req.get('Authorization');
      Logger.log('INSIDE STATIC GET TOKEN');
      Logger.log(header);

      if (header === undefined || !header.toLowerCase().startsWith('bearer ')) {
        return false;
      }
      return header.substr(7);
    }
  }

  return mixin(AuthGuardMixin);
};
