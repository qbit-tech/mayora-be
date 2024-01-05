'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      'MstCategory', // table name
      'categoryType', // new field name
      {
        allowNull: true,
        type: Sequelize.STRING(100),
      },
    )
    await queryInterface.changeColumn(
      'MstCategory', // table name
      'createdAt', // new field name
      {
        allowNull: true,
        type: Sequelize.DATE,
      },
    )
    await queryInterface.changeColumn(
      'MstCategory', // table name
      'updatedAt', // new field name
      {
        allowNull: true,
        type: Sequelize.DATE,
      },
    )
    await queryInterface.changeColumn(
      'MstCategoryParent', // table name
      'createdAt', // new field name
      {
        allowNull: true,
        type: Sequelize.DATE,
      },
    )
    await queryInterface.changeColumn(
      'MstCategoryParent', // table name
      'updatedAt', // new field name
      {
        allowNull: true,
        type: Sequelize.DATE,
      },
    )
    await queryInterface.changeColumn(
      'MstCategoryParent', // table name
      'categoryParentId', // new field name
      {
        allowNull: true,
        type: Sequelize.DATE,
      },
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      'MstCategory', // table name
      'categoryType', // new field name
      {
        allowNull: true,
        type: Sequelize.STRING(100),
      },
    )
    await queryInterface.changeColumn(
      'MstCategory', // table name
      'createdAt', // new field name
      {
        allowNull: true,
        type: Sequelize.DATE,
      },
    )
    await queryInterface.changeColumn(
      'MstCategory', // table name
      'updatedAt', // new field name
      {
        allowNull: true,
        type: Sequelize.DATE,
      },
    )
    await queryInterface.changeColumn(
      'MstCategoryParent', // table name
      'createdAt', // new field name
      {
        allowNull: true,
        type: Sequelize.DATE,
      },
    )
    await queryInterface.changeColumn(
      'MstCategoryParent', // table name
      'updatedAt', // new field name
      {
        allowNull: true,
        type: Sequelize.DATE,
      },
    )
  }
};
