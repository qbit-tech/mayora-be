import { ApiProperty } from '@nestjs/swagger';
import moment from 'moment';
import {
  AutoIncrement,
  BeforeCreate,
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

@Table({
  tableName: 'MstMachine',
})
export class MachineModel extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @ApiProperty()
  @Column
  name: string;

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
  @UpdatedAt
  updatedAt: Date;

  @Column
  createdBy: string;

  @Column
  updatedBy: string;

  @BeforeCreate
  static beforeCreateHook(instance: MachineModel) {
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
