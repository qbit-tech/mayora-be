'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('TrxManualCollection', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(255),
      },
      machineId: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      categoryId: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      value: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      shift: {
        allowNull: true,
        type: Sequelize.STRING,
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
