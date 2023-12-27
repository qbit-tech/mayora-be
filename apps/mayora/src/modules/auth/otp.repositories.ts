import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

export class OTPActivityProperties {
  iOTP: number;
  ipOTP: string;
  jOTP: { phoneNumber?: string; email?: string };
  iStatus: number;
  iUser: number;
  hashOTP: string;
}

@Table({
  tableName: 't_otp_activity',
})
export class OTPModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  iOTP: number;

  @Column({
    type: DataType.STRING(7),
  })
  ipOTP: string;

  @Column({
    type: DataType.JSONB,
  })
  jOTP: { phoneNumber: string; email: string };

  @Column({
    type: DataType.SMALLINT,
  })
  iStatus: number;

  @Column({
    type: DataType.INTEGER,
  })
  iUser: number;

  @Column({
    type: DataType.STRING,
  })
  hashOTP: string;

  @Column({
    type: DataType.STRING,
  })
  vMobile: string;

  @Column({
    type: DataType.STRING,
  })
  vEmail: string;

  @Column({
    type: DataType.DATE,
  })
  dOTPExpired: Date | string;
}
