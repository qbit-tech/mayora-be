'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('MstCategory', null, {});
    await queryInterface.bulkDelete('MstCategoryParent', null, {});

    // Make category parent level 1
    await queryInterface.bulkInsert('MstCategoryParent', [
      {
        id: 1,
        name: 'Not Operating Day and Planned Down Time',
        categoryLevel: 'level1'
      },
      {
        id: 2,
        name: 'Down Time Losses',
        categoryLevel: 'level1'
      },
      {
        id: 3,
        name: 'Speed Losses',
        categoryLevel: 'level1'
      },
      {
        id: 4,
        name: 'Defect & Rework Losses',
        categoryLevel: 'level1'
      },
    ], {});

    // Make category parent level 2
    await queryInterface.bulkInsert('MstCategoryParent', [
      {
        id: 5,
        name: 'Not Operatin Day',
        categoryParentId: 1,
        categoryLevel: 'level2'
      },
      {
        id: 6,
        name: 'Planned Down Time',
        categoryParentId: 1,
        categoryLevel: 'level2'
      },
      {
        id: 7,
        name: 'Late Start/Early Stop',
        categoryParentId: 2,
        categoryLevel: 'level2'
      },
      {
        id: 8,
        name: 'Technical Break Down',
        categoryParentId: 2,
        categoryLevel: 'level2'
      },
    ], {});

    // Make category parent level 3
    await queryInterface.bulkInsert('MstCategoryParent', [
      {
        id: 9,
        name: 'Mechanincal',
        categoryParentId: 8,
        categoryLevel: 'level3'
      },
    ], {});

    // Make category parent level 4
    await queryInterface.bulkInsert('MstCategoryParent', [
      {
        id: 10,
        name: 'Reception',
        categoryParentId: 9,
        categoryLevel: 'level4'
      },
      {
        id: 11,
        name: 'Buffer glucose',
        categoryParentId: 9,
        categoryLevel: 'level4'
      },
      {
        id: 12,
        name: 'Melting',
        categoryParentId: 9,
        categoryLevel: 'level4'
      },
      {
        id: 13,
        name: 'Scanima',
        categoryParentId: 9,
        categoryLevel: 'level4'
      },
    ], {});

    // Make category level 5 (Category)
    await queryInterface.bulkInsert('MstCategory', [
      {
        id: 1,
        name: 'Libur hari besar/Nasional',
        categoryParentId: 5,
        unit: 'kg',
        categoryType: 'manualcollection'
      },
      {
        id: 2,
        name: 'No Demand',
        categoryParentId: 5,
        unit: 'kg',
        categoryType: 'manualcollection'
      },
      {
        id: 3,
        name: 'Trial product (NDP)',
        categoryParentId: 6,
        unit: 'min',
        categoryType: 'trouble'
      },
      {
        id: 4,
        name: 'Preventive maintenance',
        categoryParentId: 6,
        unit: 'kg',
        categoryType: 'manualcollection'
      },
      {
        id: 5,
        name: 'CIP',
        categoryParentId: 6,
        unit: 'min',
        categoryType: 'trouble'
      },
      {
        id: 6,
        name: 'Terlambat stop produksi',
        categoryParentId: 7,
        unit: 'min',
        categoryType: 'trouble'
      },
      {
        id: 7,
        name: 'Valve long line bocor',
        categoryParentId: 10,
        unit: 'min',
        categoryType: 'trouble'
      },
      {
        id: 8,
        name: 'Trouble pompa sirkulasi oil',
        categoryParentId: 10,
        unit: 'kg',
        categoryType: 'manualcollection'
      },
      {
        id: 9,
        name: 'Trouble pompa sirkulasi glucose',
        categoryParentId: 10,
        unit: 'kg',
        categoryType: 'manualcollection'
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Add your seed undo logic here
    await queryInterface.bulkDelete('MstCategory', null, {});
    await queryInterface.bulkDelete('MstCategoryParent', null, {});
  },
};
