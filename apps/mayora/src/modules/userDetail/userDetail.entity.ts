import { ApiProperty } from '@nestjs/swagger';
import moment from 'moment';
import {
  AutoIncrement,
  BeforeCreate,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { MachineModel } from '../machine/machine.entity';
import { UserModel } from '../user/user.entity';

@Table({
  tableName: 'MstUserDetail'
})

export class UserDetailModel extends Model {
  @PrimaryKey
  @Column
  id: string;

  @Column
  @ApiProperty()
  userId: string;

  @BelongsTo(() => UserModel, 'userId')
  user: UserModel;

  @ApiProperty()
  @Column
  machineId: string;

  @BelongsTo(() => MachineModel, 'machineId')
  machine: MachineModel;

  @ApiProperty()
  @Column
  @CreatedAt
  createdAt: Date;

  @ApiProperty()
  @Column
  @UpdatedAt
  updatedAt: Date;

  @ApiProperty()
  @Column
  createdBy: string;

  @ApiProperty()
  @Column
  updatedBy: string;

  @BeforeCreate
  static beforeCreateHook(instance: UserDetailModel) {
    // this will be called when an instance is created or updated
    const { DATE } = DataType;
    DATE.prototype._stringify = function _stringify(date: any, options: any) {
      return this._applyTimezone(date, options).format(
        'YYYY-MM-DD HH:mm:ss.SSS',
      );
    };

    const now = moment().format('YYYY-MM-DD HH:mm:ss.SSS');

    instance.setDataValue('updatedAt', now);
    instance.setDataValue('createdAt', now);
  }
}
