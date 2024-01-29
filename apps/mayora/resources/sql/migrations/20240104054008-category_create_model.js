'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('MstCategory', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      categoryParentId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: true,
        type: Sequelize.STRING(100),
      },
      unit: {
        allowNull: true,
        type: Sequelize.STRING(100),
      },
      categoryType: {
        allowNull: true,
        type: Sequelize.STRING(100),
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
  down: async (queryInterface, Sequelize) => queryInterface.dropTable('MstCategory')
};
