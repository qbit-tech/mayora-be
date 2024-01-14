'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Make category parent level 1
    await queryInterface.bulkInsert('MstCategoryParent', [
      {
        id: 'MstCategoryParentLv1-1',
        name: 'Not Operating Day and Planned Down Time',
        categoryLevel: 'level1'
      },
      {
        id: 'MstCategoryParentLv1-2',
        name: 'Down Time Losses',
        categoryLevel: 'level1'
      },
      {
        id: 'MstCategoryParentLv1-3',
        name: 'Speed Losses',
        categoryLevel: 'level1'
      },
      {
        id: 'MstCategoryParentLv1-4',
        name: 'Defect & Rework Losses',
        categoryLevel: 'level1'
      },
    ], {});

    // Make category parent level 2
    await queryInterface.bulkInsert('MstCategoryParent', [
      {
        id: 'MstCategoryParentLv2-1',
        name: 'Not Operatin Day',
        categoryParentId: 'MstCategoryParentLv1-1',
        categoryLevel: 'level2'
      },
      {
        id: 'MstCategoryParentLv2-2',
        name: 'Planned Down Time',
        categoryParentId: 'MstCategoryParentLv1-1',
        categoryLevel: 'level2'
      },
    ], {});

    // Make category level 3
    await queryInterface.bulkInsert('MstCategory', [
      {
        id: 'MstCategoryLv3-1',
        name: 'Trial Products (NDP)',
        categoryParentId: 'MstCategoryParentLv2-1',
        unit: 'unit1'
      },
      {
        id: 'MstCategoryLv3-2',
        name: 'Others',
        categoryParentId: 'MstCategoryParentLv2-1',
        unit: 'unit1'
      },
      {
        id: 'MstCategoryLv3-3',
        name: 'Dry Cleaning',
        categoryParentId: 'MstCategoryParentLv2-1',
        unit: 'unit2'
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Add your seed undo logic here
    await queryInterface.bulkDelete('MstCategory', null, {});
    await queryInterface.bulkDelete('MstCategoryParent', null, {});
  },
};
