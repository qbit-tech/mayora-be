import {
  AllowNull,
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 't_task_attachment',
})
export class AttachmentModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  iAttachment: number;

  @Unique
  @Column({
    type: DataType.STRING(15),
  })
  ipAttachment: string;

  @Column({
    type: DataType.BIGINT,
  })
  iTicket: string;

  @Column({
    type: DataType.SMALLINT,
  })
  iType: number;

  @Column({
    type: DataType.JSONB,
  })
  vRawData: object;

  @Column({
    type: DataType.DATE,
  })
  dCreated: Date;

  @AllowNull
  @Column({
    type: DataType.DATE,
  })
  dTaskDone?: Date;

  @AllowNull
  @Column({
    type: DataType.BIGINT,
  })
  iTask?: number;
}
