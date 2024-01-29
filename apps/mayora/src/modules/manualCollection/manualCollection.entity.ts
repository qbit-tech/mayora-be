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
import { CategoryModel } from '../category/category.entity';

@Table({
  tableName: 'TrxManualCollection',
})
export class ManualCollectionModel extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  machineId: number;

  @Column
  categoryId: number;

  @BelongsTo(() => CategoryModel, 'categoryId')
  categoryParent: CategoryModel;

  @Column
  value: string;

  @Column
  shift: number;

  @Column
  remark: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @Column
  createdBy: string;

  @Column
  updatedBy: string;

  @BeforeCreate
  static beforeCreateHook(instance: ManualCollectionModel) {
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
