import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../core/auth.guard';
import { UserService } from './user.service';
import { getErrorStatusCode } from 'libs/utils/error';
import { NewUserRequest, NewUserResponse, UserFindAllRequest, UserFindAllResponse, UserProperties } from './user.contract';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get()
  async findAll(
    @Query() query: UserFindAllRequest,
    @Request() req,
  ): Promise<UserFindAllResponse> {
    try {
      Logger.log(req)
      Logger.log('findAll : ' + JSON.stringify(query), 'User.controller');
      const res = await this.userService.findAll(query);
      return res;
    } catch (error) {
      Logger.error('findAll error ::: ' + error, 'User.controller');
      throw new HttpException(error, getErrorStatusCode(error));
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get(':id')
  async getOneUser(
    @Param('id') id: string,
  ): Promise<UserProperties> {
    try {
      const result = this.userService.findOneUser(id);
      return result ? result : null;
      
    } catch (error) {
      throw new HttpException(error, getErrorStatusCode(error));
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Delete(':id')
  async deleteUser(
    @Param('id') id: string,
  ): Promise<{ isSuccess: boolean, rowsDeleted: number }> {
    try {
      const result = await this.userService.delete({ id });
      return { isSuccess: result == 1, rowsDeleted: result };
    } catch (error) {
      throw new HttpException(error, getErrorStatusCode(error));
    }
  }


  // @ApiBearerAuth()
  // @Patch(':id')
  // @UseGuards(AuthGuard())
  // async update(
  //   @Body() SLALevels: UpdateSLALevelsRequest,
  //   @Request() req,
  //   @Param('id') id: string,
  // ): Promise<{ isSuccess: boolean }> {
  //   try {
  //     if (req.user) {
  //       Logger.log('INSIDE USER UPDATE');
  //       const slaLevelsResult = await this.userService.update({
  //         SLALevels,
  //         id,
  //       });
  //       return slaLevelsResult ? { isSuccess: true } : null;
  //     } else {
  //       return Promise.reject({
  //         statusCode: 401,
  //         code: 'Unauthorized',
  //         message: 'Sign in to update User',
  //       });
  //     }
  //   } catch (error) {
  //     throw new HttpException(error, getErrorStatusCode(error));
  //   }
  // }
}
