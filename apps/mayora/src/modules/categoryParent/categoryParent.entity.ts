import moment from 'moment';
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
import { handleTimeZone } from '../../helpers/date';
import { CategoryModel } from '../category/category.entity';

@Table({
  tableName: 'MstCategoryParent',
})
export class CategoryParentModel extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUIDV4,
  })
  id: string;

  @ForeignKey(() => CategoryParentModel)
  @Column
  categoryParentId: string;

  @BelongsTo(() => CategoryParentModel, 'categoryParentId')
  categoryParent: CategoryParentModel;

  @Column
  name: string;

  @Column
  categoryLevel: string;

  @CreatedAt
  @Column({
    get(this) {
      return handleTimeZone('createdAt', this);
    },
  })
  @CreatedAt
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

  @Column
  updatedBy: string;

  @HasMany(() => CategoryParentModel, 'categoryParentId')
  children: CategoryParentModel[];

  @HasMany(() => CategoryModel, 'categoryParentId')
  level5: CategoryModel[];

  @BeforeCreate
  static beforeCreateHook(instance: CategoryParentModel) {
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
