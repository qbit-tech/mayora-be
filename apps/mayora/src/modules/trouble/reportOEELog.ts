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

export enum status {
  VALID = 'valid',
  INVALID = 'invalid',
}

@Table({
  tableName: 'TrxTrouble',
})
export class TroubleModel extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUIDV4,
  })
  id: string;

  @Column
  machineId: string;

  @Column
  categoryId: string;

  @Column
  startTime: Date;

  @Column
  endTime: Date;

  @Column
  remark: string;

  @Column
  status: status;

  @CreatedAt
  createdAt: Date;

  @Column
  createdBy: string;
}
