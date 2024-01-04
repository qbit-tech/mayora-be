'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('MstCategory', {
      id: {
        allowNull: false,
        type: Sequelize.STRING(255),
        primaryKey: true,
      },
      categoryParentId: {
        allowNull: false,
        type: Sequelize.STRING(100),
        unique: true,
      },
      name: {
        allowNull: true,
        type: Sequelize.STRING(100),
      },
      status: {
        allowNull: false,
        default: 'active',
        type: Sequelize.STRING(100),
      },
      categoryType: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
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
