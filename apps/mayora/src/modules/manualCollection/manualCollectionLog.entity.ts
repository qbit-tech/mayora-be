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
  tableName: 'TrxManualCollectionLog',
})
export class ManualCollectionLogModel extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUIDV4,
  })
  id: string;

  @Column
  defectReworkLossesId: string;

  @Column
  machineId: string;

  @Column
  categoryId  : string;

  @Column
  value  : string;

  @Column
  shift  : string;

  @Column
  remark  : string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @Column
  createdBy: string;

  @Column
  updatedBy: string;
}
