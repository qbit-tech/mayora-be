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
  tableName: 'Releases',
})
export class ReleaseModel extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUIDV4,
  })
  id: string;

  @Column
  machineId: string;

  @Column
  amount  : number;

  @Column
  time: Date;

  // @Column
  // shift: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
