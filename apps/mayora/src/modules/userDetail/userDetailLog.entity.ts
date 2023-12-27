import {
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'MstUserDetailLog',
})

export class UserDetailLogModel extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUIDV4,
  })
  Id: string;

  @Column
  userId: string;

  @Column
  machineId: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @Column
  createdBy: string;

  @Column
  updatedBy: string;
}
