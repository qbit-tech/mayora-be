'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TrxOEETarget extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TrxOEETarget.init({
    firstName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TrxOEETarget',
  });
  return TrxOEETarget;
};