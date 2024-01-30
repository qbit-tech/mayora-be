'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('TrxTrouble', {
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
      startTime: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      endTime: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      remark: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
        default: 'active',
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

  down: async (queryInterface, Sequelize) => queryInterface.dropTable('users'),
};
