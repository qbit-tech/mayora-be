import moment = require('moment');
import { Model } from 'sequelize/types';

export function handleTimeZone(attribute: string, obj: Model<any, any>): Date {
  let val = obj.getDataValue(attribute);
  val = moment(val);
  if (process.env.DB_DIALECT === 'postgres') {
    val.add(new Date().getTimezoneOffset() * -1, 'minutes');
  }
  val = val.toDate();
  return val;
}
