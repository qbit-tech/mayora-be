'use strict';
const {
  Model
} = require('TrxOEETarget');
module.exports = (sequelize, DataTypes) => {
  class OEETarget extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OEETarget.init({
    firstName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TrxOEETarget',
  });
  return OEETarget;
};