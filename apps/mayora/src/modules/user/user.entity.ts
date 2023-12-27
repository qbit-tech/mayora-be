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
  tableName: 'MstUser',
})

export class UserModel extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUIDV4,
  })
  id: string;

  @Column
  roleId: string;

  @Column
  name: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column
  identifier: string;

  @Column
  status: status;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @Column
  createdBy: string;

  @Column
  updatedBy: string;
}
