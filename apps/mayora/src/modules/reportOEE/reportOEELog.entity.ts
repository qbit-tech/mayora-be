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
  tableName: 'TrxReportOEELog',
})
export class ReportOEELogModel extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUIDV4,
  })
  id: string;

  @Column
  machineId: string;

  @Column
  OEE: string;

  @Column
  AV: string;

  @Column
  PE: string;

  @Column
  QR: string;

  @Column
  date: Date;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @Column
  createdBy: string;

  @Column
  updatedBy: string;

  @Column
  reportOEEid: string;
}
