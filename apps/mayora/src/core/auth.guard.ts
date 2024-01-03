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
import { AuthService } from '../modules/auth/auth.service';
import * as jwt from 'jsonwebtoken';

export const DEFAULT_HASH_TOKEN = '58n4984u0n98ur3';

export const AuthGuard = (role?: string | string[]) => {
  @Injectable()
  class AuthGuardMixin implements CanActivate {
    constructor(readonly authService: AuthService) {}

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
