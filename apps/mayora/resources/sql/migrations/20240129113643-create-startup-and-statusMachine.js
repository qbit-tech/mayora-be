'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TrxStartup', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      machineId: {
        allowNull: true,
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
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
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
        allowNull: true
      }
    }),
      await queryInterface.createTable('TrxStatusMachine', {
        id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        machineId: {
          allowNull: true,
          type: Sequelize.INTEGER,
        },
        status: {
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
          allowNull: true
        }
      });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('TrxStartup');
    await queryInterface.dropTable('TrxStatusMachine');
  },
};
