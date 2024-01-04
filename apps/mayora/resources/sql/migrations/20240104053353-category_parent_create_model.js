'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('MstCategoryParent', {
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
      categoryLevel: {
        allowNull: true,
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
  down: async (queryInterface, Sequelize) => queryInterface.dropTable('MstCategoryParent')
};
