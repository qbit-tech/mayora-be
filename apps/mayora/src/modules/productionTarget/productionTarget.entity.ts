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
import { UserModel } from '../user/user.entity';
import { RoleModel } from '../role/role.entity';

@Table({
  tableName: 'TrxProductionTarget',
})
export class ProductionTargetModel extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUIDV4,
  })
  id: string;

  @Column
  machineId: string;

  @Column
  target  : number;

  @Column
  activeTarget: Date;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @Column
  createdBy: string;

  // @Column
  // updatedBy: string;

  @ForeignKey(() => UserModel)
  @Column
  updatedBy: string;

  @BelongsTo(() => UserModel, 'updatedBy')
  createdByUser: UserModel;

}
