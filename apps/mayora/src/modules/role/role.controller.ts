// import {
//     Body,
//     Controller,
//     Delete,
//     Get,
//     HttpException,
//     Logger,
//     Param,
//     Patch,
//     Post,
//     Query,
//     Request,
//     UseGuards,
//   } from '@nestjs/common';
//   import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
//   import { AuthGuard } from '../../core/auth.guard';
//   import { NewRoleRequest, NewRoleResponse, RoleFindAllRequest, RoleFindAllResponse, RoleProperties, UpdateRoleRequest } from './role.contract';
//   import { RoleService } from './role.service';
//   import { getErrorStatusCode } from 'libs/utils/error';
  
//   @ApiTags('Role')
//   @Controller('role')
//   export class RoleController {
//     constructor(private readonly roleService: RoleService) {}
//     @Get()
//     async findAll(
//       @Query() query: RoleFindAllRequest,
//     ): Promise<RoleFindAllResponse> {
//       try {
//         Logger.log('findAll : ' + JSON.stringify(query), 'Role.controller');
//         const res = await this.roleService.findAll(query);
//         return res;
//       } catch (error) {
//         Logger.error('findAll error ::: ' + error, 'Role.controller');
//         throw new HttpException(error, getErrorStatusCode(error));
//       }
//     }
  
//     @Get(':idRole')
//     async getOneSLALevels(
//       @Param('idRole') idRole: number,
//     ): Promise<RoleProperties> {
//       try {
//         const result = this.roleService.findOneRole(idRole);
//         return result ? result : null;
        
//       } catch (error) {
//         throw new HttpException(error, getErrorStatusCode(error));
//       }
//     }
  
//     @ApiBearerAuth()
//     @UseGuards(AuthGuard())
//     @Delete(':idRole')
//     async deleteOneSLALevels(
//       @Param('idRole') idRole: string,
//     ): Promise<{ isSuccess: boolean, rowsDeleted: number }> {
//       try {
//         const result = await this.roleService.delete({ id: idRole });
//         return { isSuccess: result == 1, rowsDeleted: result };
//       } catch (error) {
//         throw new HttpException(error, getErrorStatusCode(error));
//       }
//     }

//     @Post('init-role')
//     async initRole(): Promise<NewRoleResponse[]> {
//       try {
//         Logger.log('INSIDE ROLE CREATE');
//         const role = ['ADMIN','SUPERVISOR','OPERATOR']
//         const roleResult = await this.roleService.bulkCreate([{name: role[0]},{name: role[1]}, {name: role[2]}], role);
//         return roleResult;
//       } catch (error) {
//         throw new HttpException(error, getErrorStatusCode(error));
//       }
//     }
  
//     @ApiBearerAuth()
//     @Post('')
//     async create(
//       @Body() role: NewRoleRequest,
//       @Request() req,
//     ): Promise<NewRoleResponse> {
//       try {
//         Logger.log('INSIDE ROLE CREATE');
//         const roleResult = await this.roleService.create({
//             name: role.name,
//         });
//         return roleResult;
//         if (req.user) {
//         } else {
//           return Promise.reject({
//             statusCode: 401,
//             code: 'Unauthorized',
//             message: 'Sign in to create SLA Levels',
//           });
//         }
//       } catch (error) {
//         throw new HttpException(error, getErrorStatusCode(error));
//       }
//     }
  
//     // @ApiBearerAuth()
//     // @Patch(':idRole')
//     // @UseGuards(AuthGuard())
//     // async update(
//     //   @Body() role: UpdateRoleRequest,
//     //   @Request() req,
//     //   @Param('idRole') idRole: number,
//     // ): Promise<{ isSuccess: boolean }> {
//     //   try {
//     //     if (req.user) {
//     //       Logger.log('INSIDE SLA LEVELS UPDATE');
//     //       const roleResult = await this.roleService.update({
//     //         SLALevels,
//     //         idRole,
//     //       });
//     //       return roleResult ? { isSuccess: true } : null;
//     //     } else {
//     //       return Promise.reject({
//     //         statusCode: 401,
//     //         code: 'Unauthorized',
//     //         message: 'Sign in to update SLA Levels',
//     //       });
//     //     }
//     //   } catch (error) {
//     //     throw new HttpException(error, getErrorStatusCode(error));
//     //   }
//     // }
//   }
  