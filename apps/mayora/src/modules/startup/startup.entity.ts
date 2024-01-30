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
import { MachineModel } from '../machine/machine.entity';

@Table({
  tableName: 'TrxStartup',
})
export class StartupModel extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  machineId: number;

  @BelongsTo(() => MachineModel, 'machineId')
  machine: MachineModel;

  @Column
  startTime: Date;

  @Column
  endTime: Date;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @Column
  createdBy: string;

  @Column
  updatedBy: string;
}
