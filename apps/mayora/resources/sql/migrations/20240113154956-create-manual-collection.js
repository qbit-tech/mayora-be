'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('TrxManualCollection', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      machineId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      categoryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      value: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      shift: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      remark: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      updatedBy: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      createdBy: {
        type: Sequelize.STRING(255),
        allowNull: false
      }
    }),

  down: async (queryInterface, Sequelize) => queryInterface.dropTable('TrxManualCollection'),
};
