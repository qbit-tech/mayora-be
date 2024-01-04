import {
  AutoIncrement,
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
  @PrimaryKey
  @Column({
    type: DataType.UUIDV4,
  })
  id: string;

  @Column
  machineId: string;

  @Column
  categoryId: string;

  @BelongsTo(() => CategoryModel, 'categoryId')
  categoryParent: CategoryModel;

  @Column
  value: string;

  @Column
  shift: string;

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
}
