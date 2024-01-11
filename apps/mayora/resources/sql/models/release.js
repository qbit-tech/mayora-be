'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Release extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Release.init({
    machineId: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    time: DataTypes.DATE,
    shift: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Release',
  });
  return Release;
};