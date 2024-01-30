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
  tableName: 'TrxStatusMachine',
})
export class StatusMachineModel extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: string;

  @Column
  machineId: string;

  @Column
  status: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @Column
  createdBy: string;

  @Column
  updatedBy: string;
}
