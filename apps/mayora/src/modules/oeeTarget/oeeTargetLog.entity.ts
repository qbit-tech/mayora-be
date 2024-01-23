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

@Table({
  tableName: 'TrxOEETargetLog',
})
export class OEETargetLogModel extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUIDV4,
  })
  id: string;

  @Column
  ORRTargetId: string;

  @Column
  machineId: string;

  @Column
  target  : string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @Column
  createdBy: string;

  // @Column
  // updatedBy: string;

  // @Column
  // OEETargetId: string;

  @ForeignKey(() => UserModel)
  @Column
  updatedBy: string;

  @BelongsTo(() => UserModel, 'updatedBy')
  updatedByUser: UserModel;
}
