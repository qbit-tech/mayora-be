'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('MstCategory', null, {});
    await queryInterface.bulkDelete('MstCategoryParent', null, {});

    // Make category parent level 1
    await queryInterface.bulkInsert('MstCategoryParent', [
      {
        id: 'NotOperatingDayPlannedDownTime',
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
        id: 'DefectReworkLosses',
        name: 'Defect & Rework Losses',
        categoryLevel: 'level1'
      },
    ], {});

    // Make category parent level 2
    await queryInterface.bulkInsert('MstCategoryParent', [
      {
        id: 'NotOperatingDay',
        name: 'Not Operatin Day',
        categoryParentId: 'NotOperatingDayPlannedDownTime',
        categoryLevel: 'level2'
      },
      {
        id: 'PlannedDownTime',
        name: 'Planned Down Time',
        categoryParentId: 'NotOperatingDayPlannedDownTime',
        categoryLevel: 'level2'
      },
      {
        id: 'LateStartEarlyStop',
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
        id: 'LiburharibesarNasional',
        name: 'Libur hari besar/Nasional',
        categoryParentId: 'NotOperatingDay',
        unit: 'kg',
        categoryType: 'manualcollection'
      },
      {
        id: 'NoDemand',
        name: 'No Demand',
        categoryParentId: 'NotOperatingDay',
        unit: 'kg',
        categoryType: 'manualcollection'
      },
      {
        id: 'Trialproduct(NDP)',
        name: 'Trial product (NDP)',
        categoryParentId: 'PlannedDownTime',
        unit: 'min',
        categoryType: 'trouble'
      },
      {
        id: 'Preventivemaintenance',
        name: 'Preventive maintenance',
        categoryParentId: 'PlannedDownTime',
        unit: 'kg',
        categoryType: 'manualcollection'
      },
      {
        id: 'CIP',
        name: 'CIP',
        categoryParentId: 'PlannedDownTime',
        unit: 'min',
        categoryType: 'trouble'
      },
      {
        id: 'Terlambatstopproduksi',
        name: 'Terlambat stop produksi',
        categoryParentId: 'LateStartEarlyStop',
        unit: 'min',
        categoryType: 'trouble'
      },
      {
        id: 'Valvelonglinebocor',
        name: 'Valve long line bocor',
        categoryParentId: 'Reception',
        unit: 'min',
        categoryType: 'trouble'
      },
      {
        id: 'Troublepompasirkulasioil',
        name: 'Trouble pompa sirkulasi oil',
        categoryParentId: 'Reception',
        unit: 'kg',
        categoryType: 'manualcollection'
      },
      {
        id: 'Troublepompasirkulasiglucose',
        name: 'Trouble pompa sirkulasi glucose',
        categoryParentId: 'Reception',
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
