import { ApiProperty } from '@nestjs/swagger';
import { Column, Model, PrimaryKey, Table, Unique, CreatedAt, UpdatedAt, DataType, AutoIncrement } from "sequelize-typescript";
import { AppConfigModel } from './appConfig.entity';

export class AppConfigChangesLogsProperties {
  @ApiProperty()
  iHistory: string;

  @ApiProperty()
  vKey: string;

  @ApiProperty()
  jNewData: Partial<AppConfigModel>;
}

@Table({
  tableName: 'app_configs_changes_logs',
  timestamps: true,
})
export class AppConfigChangesLogsModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  iHistory: number;

  @Unique
  @Column
  vKey: string;

  @Column({ type: DataType.JSONB })
  jNewData: Partial<AppConfigModel>;

  @Column({
    type: DataType.BIGINT,
  })
  iUser: number;

  @Column({ type: DataType.JSONB })
  jUser: any;

  @CreatedAt
  dCreatedServer: Date;

  @UpdatedAt
  dUpdatedServer: Date;
}
