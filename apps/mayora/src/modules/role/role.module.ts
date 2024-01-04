import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { RoleModel } from './role.entity';
import { RoleService } from './role.service';
// import { RoleController } from './role.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([RoleModel]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.ENV_PATH,
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
