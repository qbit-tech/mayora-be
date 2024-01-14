import {
  AutoIncrement,
  BeforeCreate,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { CategoryParentModel } from '../categoryParent/categoryParent.entity';
import { handleTimeZone } from '../../helpers/date';
import moment from 'moment';
import { ManualCollectionModel } from '../manualCollection/manualCollection.entity';

@Table({
  tableName: 'MstCategory',
})
export class CategoryModel extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUIDV4,
  })
  id: string;

  @Column
  categoryParentId: string;

  @BelongsTo(() => CategoryParentModel, 'categoryParentId')
  categoryParent: CategoryParentModel;

  @Column
  name: string;

  @Column
  categoryType: string;

  @Column
  unit: string;

  // @CreatedAt
  // createdAt: Date;

  @CreatedAt
  @Column({
    get(this) {
      return handleTimeZone('createdAt', this);
    },
  })
  createdAt: Date;

  // @UpdatedAt
  // updatedAt: Date;

  @UpdatedAt
  @Column({
    get(this) {
      return handleTimeZone('updatedAt', this);
    },
  })
  updatedAt: Date;

  @Column
  createdBy: string;

  @Column
  updatedBy: string;

  @HasMany(() => ManualCollectionModel, 'categoryId')
  manualCollection: ManualCollectionModel[];

  @BeforeCreate
  static beforeCreateHook(instance: CategoryModel) {
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
