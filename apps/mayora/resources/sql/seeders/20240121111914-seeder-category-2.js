'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('MstCategory', null, {});
    await queryInterface.bulkDelete('MstCategoryParent', null, {});

    // Make category parent level 1
    await queryInterface.bulkInsert('MstCategoryParent', [
      {
        id: 'NotOperatingDay&PlannedDownTime',
        name: 'Not Operating Day and Planned Down Time',
        categoryLevel: 'level1'
      },
      {
        id: 'DownTimeLosses',
        name: 'Down Time Losses',
        categoryLevel: 'level1'
      },
      {
        id: 'SpeedLosses',
        name: 'Speed Losses',
        categoryLevel: 'level1'
      },
      {
        id: 'Defect&ReworkLosses',
        name: 'Defect & Rework Losses',
        categoryLevel: 'level1'
      },
    ], {});

    // Make category parent level 2
    await queryInterface.bulkInsert('MstCategoryParent', [
      {
        id: 'NotOperatingDay',
        name: 'Not Operatin Day',
        categoryParentId: 'NotOperatingDay&PlannedDownTime',
        categoryLevel: 'level2'
      },
      {
        id: 'PlannedDownTime',
        name: 'Planned Down Time',
        categoryParentId: 'NotOperatingDay&PlannedDownTime',
        categoryLevel: 'level2'
      },
      {
        id: 'LateStart/EarlyStop',
        name: 'Late Start/Early Stop',
        categoryParentId: 'DownTimeLosses',
        categoryLevel: 'level2'
      },
      {
        id: 'TechnicalBreakDown',
        name: 'Technical Break Down',
        categoryParentId: 'DownTimeLosses',
        categoryLevel: 'level2'
      },
    ], {});

    // Make category parent level 3
    await queryInterface.bulkInsert('MstCategoryParent', [
      {
        id: 'Mechanical',
        name: 'Mechanical',
        categoryParentId: 'TechnicalBreakDown',
        categoryLevel: 'level3'
      },
    ], {});

    // Make category parent level 4
    await queryInterface.bulkInsert('MstCategoryParent', [
      {
        id: 'Reception',
        name: 'Reception',
        categoryParentId: 'Mechanical',
        categoryLevel: 'level4'
      },
      {
        id: 'Bufferglucose',
        name: 'Buffer glucose',
        categoryParentId: 'Mechanical',
        categoryLevel: 'level4'
      },
      {
        id: 'Melting',
        name: 'Melting',
        categoryParentId: 'Mechanical',
        categoryLevel: 'level4'
      },
      {
        id: 'Scanima',
        name: 'Scanima',
        categoryParentId: 'Mechanical',
        categoryLevel: 'level4'
      },
    ], {});

    // Make category level 5 (Category)
    await queryInterface.bulkInsert('MstCategory', [
      {
        id: 'Liburharibesar/Nasional',
        name: 'Libur hari besar/Nasional',
        categoryParentId: 'NotOperatingDay',
        unit: 'unit1',
        categoryType: 'manualcollection'
      },
      {
        id: 'NoDemand',
        name: 'No Demand',
        categoryParentId: 'NotOperatingDay',
        unit: 'unit1',
        categoryType: 'manualcollection'
      },
      {
        id: 'Trialproduct(NDP)',
        name: 'Trial product (NDP)',
        categoryParentId: 'PlannedDownTime',
        unit: 'unit2',
        categoryType: 'trouble'
      },
      {
        id: 'Preventive maintenance',
        name: 'Preventive maintenance',
        categoryParentId: 'PlannedDownTime',
        unit: 'unit2',
        categoryType: 'manualcollection'
      },
      {
        id: 'CIP',
        name: 'CIP',
        categoryParentId: 'PlannedDownTime',
        unit: 'unit2',
        categoryType: 'trouble'
      },
      {
        id: 'Terlambatstopproduksi',
        name: 'Terlambat stop produksi',
        categoryParentId: 'LateStart/EarlyStop',
        unit: 'unit2',
        categoryType: 'trouble'
      },
      {
        id: 'Valvelonglinebocor',
        name: 'Valve long line bocor',
        categoryParentId: 'Reception',
        unit: 'unit2',
        categoryType: 'trouble'
      },
      {
        id: 'Troublepompasirkulasioil',
        name: 'Trouble pompa sirkulasi oil',
        categoryParentId: 'Reception',
        unit: 'unit2',
        categoryType: 'manualcollection'
      },
      {
        id: 'Troublepompasirkulasiglucose',
        name: 'Trouble pompa sirkulasi glucose',
        categoryParentId: 'Reception',
        unit: 'unit2',
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
