import { ApiProperty } from '@nestjs/swagger';
import { Column, Model, PrimaryKey, Table, Unique, CreatedAt, UpdatedAt, DataType, AutoIncrement } from "sequelize-typescript";

export class AppConfigProperties {
  @ApiProperty()
  vKey: string;

  @ApiProperty()
  vValue: string;

  @ApiProperty()
  html?: string;
}

@Table({
  tableName: 'app_configs',
  timestamps: true,
})
export class AppConfigModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  iConfig: number;

  @Unique
  @Column
  vKey: string;

  @Column({ type: DataType.TEXT })
  vValue: string;

  @CreatedAt
  dCreatedServer: Date;

  @UpdatedAt
  dUpdatedServer: Date;
}
