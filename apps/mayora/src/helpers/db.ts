import { Op } from 'sequelize';

export function getLikeOp() {
  if (process.env.DB_DIALECT === 'postgres') {
    return Op.iLike;
  }
  return Op.like;
}
