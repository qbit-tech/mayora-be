'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('MstCategory', 'status', 'unit');
    await queryInterface.removeConstraint('MstCategory', 'MstCategory_categoryParentId_key');
    await queryInterface.removeConstraint('MstCategoryParent', 'MstCategoryParent_categoryParentId_key');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('MstCategory', 'status', 'unit');
    await queryInterface.removeConstraint('MstCategory', 'MstCategory_categoryParentId_key');
    await queryInterface.removeConstraint('MstCategoryParent', 'MstCategoryParent_categoryParentId_key');
  },
};
