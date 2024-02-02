import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
import { handleTimeZone } from '../../helpers/date';
import { CategoryModel } from '../category/category.entity';
import { MachineModel } from '../machine/machine.entity';
import { UserModel } from '../user/user.entity';

export enum status {
  VALID = 'valid',
  INVALID = 'invalid',
}

@Table({
  tableName: 'TrxTrouble',
})
export class TroubleModel extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @ApiProperty()
  @Column
  machineId: number;

  @BelongsTo(() => MachineModel, 'machineId')
  machine: MachineModel;

  @ApiProperty()
  @Column
  categoryId: number;

  @BelongsTo(() => CategoryModel, 'categoryId')
  categoryParent: CategoryModel;

  @ApiProperty()
  @Column
  startTime: Date;

  @ApiProperty()
  @Column
  endTime: Date;

  @ApiPropertyOptional()
  @Column
  remark: string;

  @ApiPropertyOptional()
  @Column
  status: string;

  @CreatedAt
  @Column({
    get(this) {
      return handleTimeZone('createdAt', this);
    },
  })
  createdAt: Date;

  @UpdatedAt
  @Column({
    get(this) {
      return handleTimeZone('updatedAt', this);
    },
  })
  updatedAt: Date;

  @Column
  createdBy: string;

  @BelongsTo(() => UserModel, 'createdBy')
  user: UserModel;

  @Column
  updatedBy: string;

  @BeforeCreate
  static beforeCreateHook(instance: TroubleModel) {
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
