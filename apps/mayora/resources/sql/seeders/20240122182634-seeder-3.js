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
      {
        id: 14,
        name: 'Release',
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
      {
        id: 15,
        name: 'Set-Up & Adjustment',
        categoryParentId: 2,
        categoryLevel: 'level2'
      },
      {
        id: 16,
        name: 'Idling & Minor Stoppages',
        categoryParentId: 2,
        categoryLevel: 'level2'
      },
      {
        id: 17,
        name: 'Reduced Speed',
        categoryParentId: 3,
        categoryLevel: 'level2'
      },
      {
        id: 18,
        name: 'Defect',
        categoryParentId: 4,
        categoryLevel: 'level2'
      },
      {
        id: 19,
        name: 'Rework 41',
        categoryParentId: 4,
        categoryLevel: 'level2'
      },
      {
        id: 20,
        name: 'Rework 44',
        categoryParentId: 4,
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
      {
        id: 21,
        name: 'Electrical',
        categoryParentId: 8,
        categoryLevel: 'level3'
      },
      {
        id: 22,
        name: 'Utility',
        categoryParentId: 8,
        categoryLevel: 'level3'
      },
      {
        id: 23,
        name: 'Minor stop',
        categoryParentId: 16,
        categoryLevel: 'level3'
      },
      {
        id: 24,
        name: 'Minor cleaning',
        categoryParentId: 16,
        categoryLevel: 'level3'
      },
      {
        id: 25,
        name: 'Warehouse Problem',
        categoryParentId: 16,
        categoryLevel: 'level3'
      },
      {
        id: 26,
        name: 'Std parameter/Qty tdk tercapai',
        categoryParentId: 17,
        categoryLevel: 'level3'
      },
      {
        id: 27,
        name: 'Reject for recycle',
        categoryParentId: 18,
        categoryLevel: 'level3'
      },
      {
        id: 28,
        name: 'Reprocess',
        categoryParentId: 19,
        categoryLevel: 'level3'
      },
      {
        id: 29,
        name: 'Reprocess',
        categoryParentId: 20,
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
      {
        id: 82,
        name: 'Pompa Hot Water',
        categoryParentId: 9,
        categoryLevel: 'level4'
      },
      {
        id: 30,
        name: 'Blending',
        categoryParentId: 9,
        categoryLevel: 'level4'
      },
      {
        id: 31,
        name: 'Pasteurizer',
        categoryParentId: 9,
        categoryLevel: 'level4'
      },
      {
        id: 32,
        name: 'Homogenizer',
        categoryParentId: 9,
        categoryLevel: 'level4'
      },
      {
        id: 33,
        name: 'Cooler (line 4)',
        categoryParentId: 9,
        categoryLevel: 'level4'
      },
      {
        id: 34,
        name: 'HPP (line 4)',
        categoryParentId: 9,
        categoryLevel: 'level4'
      },
      {
        id: 35,
        name: 'Maximator (line 4)',
        categoryParentId: 9,
        categoryLevel: 'level4'
      },
      {
        id: 36,
        name: 'Nozzle',
        categoryParentId: 9,
        categoryLevel: 'level4'
      },
      {
        id: 37,
        name: 'Burner',
        categoryParentId: 9,
        categoryLevel: 'level4'
      },
      {
        id: 38,
        name: 'Inlet Fan',
        categoryParentId: 9,
        categoryLevel: 'level4'
      },
      {
        id: 39,
        name: 'Exhaust Fan',
        categoryParentId: 9,
        categoryLevel: 'level4'
      },
      {
        id: 40,
        name: 'Desiccant Regeneration Fan',
        categoryParentId: 9,
        categoryLevel: 'level4'
      },
      {
        id: 41,
        name: 'Cooling Ring Air Fan/Throat cooling',
        categoryParentId: 9,
        categoryLevel: 'level4'
      },
      {
        id: 42,
        name: 'VFB Exhaust Fan',
        categoryParentId: 9,
        categoryLevel: 'level4'
      },
      {
        id: 43,
        name: 'Lobe Blower',
        categoryParentId: 9,
        categoryLevel: 'level4'
      },
      {
        id: 44,
        name: 'Regent Blower',
        categoryParentId: 9,
        categoryLevel: 'level4'
      },
      {
        id: 45,
        name: 'Fines Recycle Blower',
        categoryParentId: 9,
        categoryLevel: 'level4'
      },
      {
        id: 46,
        name: 'Secondary Cyclone 1',
        categoryParentId: 9,
        categoryLevel: 'level4'
      },
      {
        id: 47,
        name: 'Secondary Cyclone 2',
        categoryParentId: 9,
        categoryLevel: 'level4'
      },
      {
        id: 48,
        name: 'Primary Cyclone',
        categoryParentId: 9,
        categoryLevel: 'level4'
      },
      {
        id: 49,
        name: 'FB Cyclone',
        categoryParentId: 9,
        categoryLevel: 'level4'
      },
      {
        id: 50,
        name: 'Cooling Fan (line 3 & 4)',
        categoryParentId: 9,
        categoryLevel: 'level4'
      },
      {
        id: 51,
        name: 'Dehumidifier',
        categoryParentId: 9,
        categoryLevel: 'level4'
      },
      {
        id: 52,
        name: 'VFB inlet fan',
        categoryParentId: 9,
        categoryLevel: 'level4'
      },
      {
        id: 53,
        name: 'Fluid Bed 1',
        categoryParentId: 9,
        categoryLevel: 'level4'
      },
      {
        id: 54,
        name: 'Fluid Bed 2',
        categoryParentId: 9,
        categoryLevel: 'level4'
      },
      {
        id: 55,
        name: 'Sievter',
        categoryParentId: 9,
        categoryLevel: 'level4'
      },
      {
        id: 56,
        name: 'Packing 750',
        categoryParentId: 9,
        categoryLevel: 'level4'
      },
      {
        id: 57,
        name: 'Packing 25 (line 3 & 4)',
        categoryParentId: 9,
        categoryLevel: 'level4'
      },
      {
        id: 58,
        name: 'Trouble CIP (Saat Running CIP)',
        categoryParentId: 9,
        categoryLevel: 'level4'
      },
      {
        id: 59,
        name: 'Scanima',
        categoryParentId: 21,
        categoryLevel: 'level4'
      },
      {
        id: 60,
        name: 'Pasteurizer',
        categoryParentId: 21,
        categoryLevel: 'level4'
      },
      {
        id: 61,
        name: 'Homogenizer',
        categoryParentId: 21,
        categoryLevel: 'level4'
      },
      {
        id: 62,
        name: 'HPP',
        categoryParentId: 21,
        categoryLevel: 'level4'
      },
      {
        id: 63,
        name: 'Maximator',
        categoryParentId: 21,
        categoryLevel: 'level4'
      },
      {
        id: 64,
        name: 'Panel MCC',
        categoryParentId: 21,
        categoryLevel: 'level4'
      },
      {
        id: 65,
        name: 'Burner',
        categoryParentId: 21,
        categoryLevel: 'level4'
      },
      {
        id: 66,
        name: 'Inlet Fan',
        categoryParentId: 21,
        categoryLevel: 'level4'
      },
      {
        id: 67,
        name: 'Exhaust Fan',
        categoryParentId: 21,
        categoryLevel: 'level4'
      },
      {
        id: 68,
        name: 'Desiccant Regeneration Fan',
        categoryParentId: 21,
        categoryLevel: 'level4'
      },
      {
        id: 69,
        name: 'Chamber',
        categoryParentId: 21,
        categoryLevel: 'level4'
      },
      {
        id: 70,
        name: 'Regent Blower',
        categoryParentId: 21,
        categoryLevel: 'level4'
      },
      {
        id: 71,
        name: 'Dehumidifier',
        categoryParentId: 21,
        categoryLevel: 'level4'
      },
      {
        id: 72,
        name: 'Lobe Blower',
        categoryParentId: 21,
        categoryLevel: 'level4'
      },
      {
        id: 73,
        name: 'Cooling fan',
        categoryParentId: 21,
        categoryLevel: 'level4'
      },
      {
        id: 74,
        name: 'Cyclone',
        categoryParentId: 21,
        categoryLevel: 'level4'
      },
      {
        id: 75,
        name: 'Fluid Bed',
        categoryParentId: 21,
        categoryLevel: 'level4'
      },
      {
        id: 76,
        name: 'Sievter',
        categoryParentId: 21,
        categoryLevel: 'level4'
      },
      {
        id: 77,
        name: 'Packing 750',
        categoryParentId: 21,
        categoryLevel: 'level4'
      },
      {
        id: 78,
        name: 'Packing 25',
        categoryParentId: 21,
        categoryLevel: 'level4'
      },
      {
        id: 79,
        name: 'Packing 250',
        categoryParentId: 21,
        categoryLevel: 'level4'
      },
      {
        id: 80,
        name: 'UTILITAS',
        categoryParentId: 22,
        categoryLevel: 'level4'
      },
      {
        id: 81,
        name: 'AHU',
        categoryParentId: 22,
        categoryLevel: 'level4'
      }
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
        categoryType: 'trouble'
      },
      {
        id: 9,
        name: 'Trouble pompa sirkulasi glucose',
        categoryParentId: 10,
        unit: 'kg',
        categoryType: 'trouble'
      },
      {
        id: 10,
        name: 'Trouble pompa inload oil',
        categoryParentId: 10,
        unit: 'kg',
        categoryType: 'trouble'
      },
      {
        id: 11,
        name: 'Trouble pompa inload glucose',
        categoryParentId: 10,
        unit: 'kg',
        categoryType: 'trouble'
      },
      {
        id: 12,
        name: 'Trouble motor HWG',
        categoryParentId: 10,
        unit: 'kg',
        categoryType: 'trouble'
      },
      {
        id: 13,
        name: 'Pengelasan jalur pipa glukosa',
        categoryParentId: 10,
        unit: 'kg',
        categoryType: 'trouble'
      },
      {
        id: 14,
        name: 'Trouble pompa transfer oil',
        categoryParentId: 10,
        unit: 'kg',
        categoryType: 'trouble'
      },
      {
        id: 15,
        name: 'Trouble pump buffer glucose',
        categoryParentId: 11,
        unit: 'kg',
        categoryType: 'trouble'
      },
      {
        id: 16,
        name: 'Trouble three way valve buffer glucose',
        categoryParentId: 11,
        unit: 'kg',
        categoryType: 'trouble'
      },
      {
        id: 17,
        name: 'trouble jacketing',
        categoryParentId: 11,
        unit: 'kg',
        categoryType: 'trouble'
      },
      {
        id: 18,
        name: 'Trouble agitator melting',
        categoryParentId: 12,
        unit: 'kg',
        categoryType: 'trouble'
      },
      {
        id: 19,
        name: 'Trouble impeller pump transfer melting',
        categoryParentId: 12,
        unit: 'kg',
        categoryType: 'trouble'
      },
      {
        id: 20,
        name: 'Trouble valve transfer',
        categoryParentId: 12,
        unit: 'kg',
        categoryType: 'trouble'
      },
      {
        id: 21,
        name: 'Trouble strainer',
        categoryParentId: 12,
        unit: 'kg',
        categoryType: 'trouble'
      },
      ///
      {
        "id": 22,
        "name": "Penggantian mechanical seal",
        "categoryParentId": 13,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 23,
        "name": "Penggantian v belt",
        "categoryParentId": 13,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 24,
        "name": "Penggantian bearing scanima",
        "categoryParentId": 13,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 25,
        "name": "Trouble motor scanima",
        "categoryParentId": 13,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 26,
        "name": "Trouble agitator scanima",
        "categoryParentId": 13,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 27,
        "name": "Trouble valve transfer scanima",
        "categoryParentId": 13,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 28,
        "name": "Trouble flowmeter glucose",
        "categoryParentId": 13,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 29,
        "name": "Trouble flowmeter oil",
        "categoryParentId": 13,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 30,
        "name": "Trouble Flowmeter Hot water",
        "categoryParentId": 13,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 31,
        "name": "Trouble valve in water",
        "categoryParentId": 13,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 32,
        "name": "Trouble valve in oil",
        "categoryParentId": 13,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 33,
        "name": "Trouble valve in glucose",
        "categoryParentId": 13,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 34,
        "name": "Trouble valve hopper 1",
        "categoryParentId": 13,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 35,
        "name": "Trouble valve hopper 2",
        "categoryParentId": 13,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 36,
        "name": "Perbaikan vacuum scanima",
        "categoryParentId": 13,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 37,
        "name": "Trouble pompa scanima to blending",
        "categoryParentId": 13,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 38,
        "name": "Trouble pompa blending to scanima",
        "categoryParentId": 13,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 39,
        "name": "Jalur strainer mampet",
        "categoryParentId": 13,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 40,
        "name": "Trouble Mech Seal",
        "categoryParentId": 29,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 41,
        "name": "Pasteurizer (Otomatis)",
        "categoryParentId": 31,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 42,
        "name": "Trouble pipa pasteurizer",
        "categoryParentId": 31,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 43,
        "name": "Trouble pompa sirkulasi pasteurizer",
        "categoryParentId": 31,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 44,
        "name": "Trouble feed pump",
        "categoryParentId": 31,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 45,
        "name": "Pipa feed line bocor",
        "categoryParentId": 31,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 46,
        "name": "Flexible feed line bocor",
        "categoryParentId": 31,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 47,
        "name": "Trouble gearbox motor",
        "categoryParentId": 31,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 48,
        "name": "Trouble Jalur PHE",
        "categoryParentId": 31,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 49,
        "name": "Double filter bocor",
        "categoryParentId": 31,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 50,
        "name": "Pipa pasteurizer mampet",
        "categoryParentId": 31,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 51,
        "name": "Trouble valve steam pasteurizer",
        "categoryParentId": 31,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 52,
        "name": "Homogenizer (Otomatis)",
        "categoryParentId": 32,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 53,
        "name": "Ganti Gasket Plunger",
        "categoryParentId": 32,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 54,
        "name": "Over pressure",
        "categoryParentId": 32,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 55,
        "name": "Trouble plunger",
        "categoryParentId": 32,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 56,
        "name": "Flange homo bocor",
        "categoryParentId": 32,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 57,
        "name": "Perbaikan spline gear",
        "categoryParentId": 32,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 58,
        "name": "Perbaikan crankshaft",
        "categoryParentId": 32,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 59,
        "name": "Trouble v belt",
        "categoryParentId": 32,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 60,
        "name": "Pressure tidak stabil",
        "categoryParentId": 32,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 61,
        "name": "Perbaikan motor Homogenizer",
        "categoryParentId": 32,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 62,
        "name": "Perbaikan motor pompa oil",
        "categoryParentId": 32,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 63,
        "name": "Perbaikan motor Fan",
        "categoryParentId": 32,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 64,
        "name": "Trouble stage",
        "categoryParentId": 32,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 65,
        "name": "Trouble upper dan lower valve",
        "categoryParentId": 32,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 66,
        "name": "Trouble Monoblock",
        "categoryParentId": 32,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 67,
        "name": "Baut flange homo patah",
        "categoryParentId": 32,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 68,
        "name": "Trouble cooler Oil",
        "categoryParentId": 32,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 69,
        "name": "Perbaikan bearing gearbox",
        "categoryParentId": 32,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 70,
        "name": "Trouble safety valve",
        "categoryParentId": 32,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 71,
        "name": "Pengecekan spindel",
        "categoryParentId": 32,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 72,
        "name": "Trouble pipa cooler",
        "categoryParentId": 33,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 73,
        "name": "Trouble pompa",
        "categoryParentId": 33,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 74,
        "name": "Trouble couple",
        "categoryParentId": 33,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 75,
        "name": "Trouble balance tank",
        "categoryParentId": 33,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 76,
        "name": "Trouble feed pump balance tank",
        "categoryParentId": 33,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 77,
        "name": "Ganti Gasket",
        "categoryParentId": 34,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 78,
        "name": "Over pressure",
        "categoryParentId": 34,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 79,
        "name": "Low pressure",
        "categoryParentId": 34,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 80,
        "name": "Plunger pecah",
        "categoryParentId": 34,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 81,
        "name": "Flange HPP Bocor",
        "categoryParentId": 34,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 82,
        "name": "Pressure tidak stabil",
        "categoryParentId": 34,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 83,
        "name": "Trouble Drive Seal",
        "categoryParentId": 34,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 84,
        "name": "Trouble HPP",
        "categoryParentId": 34,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 85,
        "name": "Trouble Valve",
        "categoryParentId": 34,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 86,
        "name": "Trouble Bearing Gearbox",
        "categoryParentId": 34,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 87,
        "name": "Trouble Gearbox",
        "categoryParentId": 34,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 88,
        "name": "Trouble oil",
        "categoryParentId": 34,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 89,
        "name": "Trouble Pump Oil",
        "categoryParentId": 34,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 90,
        "name": "Penggantian Spline Gear",
        "categoryParentId": 34,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 91,
        "name": "Trouble check valve",
        "categoryParentId": 35,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 92,
        "name": "Static mixer bocor",
        "categoryParentId": 35,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 93,
        "name": "Trouble pressure maximator",
        "categoryParentId": 35,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 94,
        "name": "Pipa Inject nitrogen",
        "categoryParentId": 35,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 95,
        "name": "Nozzle (Otomatis)",
        "categoryParentId": 36,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 96,
        "name": "Trouble Selang Nozzle",
        "categoryParentId": 36,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 97,
        "name": "Nepple nozzle bocor",
        "categoryParentId": 36,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 98,
        "name": "Ferrule tubing nozzle lepas",
        "categoryParentId": 36,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 99,
        "name": "Trouble Connector Nozzle",
        "categoryParentId": 36,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 100,
        "name": "Trouble Valve Nozzle",
        "categoryParentId": 36,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 101,
        "name": "Burner (Otomatis)",
        "categoryParentId": 37,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 102,
        "name": "Trouble Pneumatic/Busi",
        "categoryParentId": 37,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 103,
        "name": "Trouble regulator",
        "categoryParentId": 37,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 104,
        "name": "Jalur pilot gas kotor",
        "categoryParentId": 37,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 105,
        "name": "Inlet Fan (Otomatis)",
        "categoryParentId": 38,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 106,
        "name": "V belt lepas",
        "categoryParentId": 38,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 107,
        "name": "Penggantian flexible",
        "categoryParentId": 38,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 108,
        "name": "Trouble Motor",
        "categoryParentId": 38,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 109,
        "name": "Penggantian bearing",
        "categoryParentId": 38,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 110,
        "name": "Penggantian Plummer",
        "categoryParentId": 38,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 111,
        "name": "trouble impeller",
        "categoryParentId": 38,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 112,
        "name": "Exhaust Fan (Otomatis)",
        "categoryParentId": 39,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 113,
        "name": "V belt lepas",
        "categoryParentId": 39,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 114,
        "name": "Penggantian flexible",
        "categoryParentId": 39,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 115,
        "name": "Trouble Motor",
        "categoryParentId": 39,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 116,
        "name": "Penggantian bearing",
        "categoryParentId": 39,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 117,
        "name": "Penggantian Plummer",
        "categoryParentId": 39,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 118,
        "name": "trouble impeller",
        "categoryParentId": 39,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 119,
        "name": "Body exhaust retak/pecah",
        "categoryParentId": 39,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 120,
        "name": "Desiccant Regeneration Fan (Otomatis)",
        "categoryParentId": 40,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 121,
        "name": "Trouble Motor",
        "categoryParentId": 40,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 122,
        "name": "Trouble steam",
        "categoryParentId": 40,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 123,
        "name": "Cooling Ring Air Fan/Throat cooling (Otomatis)",
        "categoryParentId": 41,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 124,
        "name": "Ganti Hepa Filter",
        "categoryParentId": 41,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 125,
        "name": "V belt lepas",
        "categoryParentId": 41,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 126,
        "name": "Trouble plummer",
        "categoryParentId": 41,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 127,
        "name": "trouble impeller",
        "categoryParentId": 41,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 128,
        "name": "Bearing motor throat cooling",
        "categoryParentId": 41,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 129,
        "name": "Trouble throat cooling",
        "categoryParentId": 41,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 130,
        "name": "Penggantian Motor",
        "categoryParentId": 41,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 131,
        "name": "Dudukan motor retak",
        "categoryParentId": 41,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 132,
        "name": "VFB Exhaust Fan (Otomatis)",
        "categoryParentId": 42,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 133,
        "name": "Trouble motor",
        "categoryParentId": 42,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 134,
        "name": "Trouble Plummer",
        "categoryParentId": 42,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 135,
        "name": "Trouble V-belt",
        "categoryParentId": 42,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 136,
        "name": "trouble impeller",
        "categoryParentId": 42,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 137,
        "name": "Cover v belt exhaust retak",
        "categoryParentId": 42,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 138,
        "name": "Lobe Blower (Otomatis)",
        "categoryParentId": 43,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 139,
        "name": "Trouble motor",
        "categoryParentId": 43,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 140,
        "name": "Trouble Plummer",
        "categoryParentId": 43,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 141,
        "name": "trouble impeller",
        "categoryParentId": 43,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 142,
        "name": "Regent Blower (Otomatis)",
        "categoryParentId": 44,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 143,
        "name": "Trouble motor",
        "categoryParentId": 44,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 144,
        "name": "Trouble Plummer",
        "categoryParentId": 44,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 145,
        "name": "trouble impeller",
        "categoryParentId": 44,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 146,
        "name": "Fines Recycle Blower (Otomatis)",
        "categoryParentId": 45,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 147,
        "name": "Trouble motor",
        "categoryParentId": 45,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 148,
        "name": "Trouble Plummer",
        "categoryParentId": 45,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 149,
        "name": "trouble impeller",
        "categoryParentId": 45,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 150,
        "name": "Secondary Cyclone 1 (Otomatis)",
        "categoryParentId": 46,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 151,
        "name": "Trouble rantai",
        "categoryParentId": 46,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 152,
        "name": "Trouble Impactor",
        "categoryParentId": 46,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 153,
        "name": "Trouble Rotary",
        "categoryParentId": 46,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 154,
        "name": "Primary Cyclone (Otomatis)",
        "categoryParentId": 47,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 155,
        "name": "Trouble rantai",
        "categoryParentId": 47,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 156,
        "name": "Trouble Impactor",
        "categoryParentId": 47,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 157,
        "name": "Trouble Rotary",
        "categoryParentId": 47,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 158,
        "name": "Jalur fines recycle bocor",
        "categoryParentId": 47,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 159,
        "name": "FB Cyclone (Otomatis)",
        "categoryParentId": 48,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 160,
        "name": "Trouble rantai",
        "categoryParentId": 48,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 161,
        "name": "Trouble Impactor",
        "categoryParentId": 48,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 162,
        "name": "Trouble Rotary",
        "categoryParentId": 48,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 163,
        "name": "Penggantian flexible",
        "categoryParentId": 49,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 164,
        "name": "Trouble motor cooling fan",
        "categoryParentId": 49,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 165,
        "name": "Penggantian bearing",
        "categoryParentId": 49,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 166,
        "name": "Penggantian Plummer",
        "categoryParentId": 49,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 167,
        "name": "Trouble impeller",
        "categoryParentId": 49,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 168,
        "name": "V belt lepas",
        "categoryParentId": 49,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 169,
        "name": "Dehumidifier (Otomatis)",
        "categoryParentId": 50,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 170,
        "name": "Trouble Rantai",
        "categoryParentId": 50,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 171,
        "name": "Trouble motor desiccant wheel",
        "categoryParentId": 50,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 172,
        "name": "Penggantian Hepa Coil Box",
        "categoryParentId": 50,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 173,
        "name": "Trouble Steam Coil Box",
        "categoryParentId": 50,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 174,
        "name": "VFB inlet fan (Otomatis)",
        "categoryParentId": 51,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 175,
        "name": "Trouble Motor VFB Inlet Fan",
        "categoryParentId": 51,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 176,
        "name": "Trouble V-belt VFB Inlet Fan",
        "categoryParentId": 51,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 177,
        "name": "Trouble Plummer VFB Inlet Fan",
        "categoryParentId": 51,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 178,
        "name": "trouble impeller VFB Inlet Fan",
        "categoryParentId": 51,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 179,
        "name": "Fire Suppression (Otomatis)",
        "categoryParentId": 52,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 180,
        "name": "Trouble Fire suppression",
        "categoryParentId": 52,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 181,
        "name": "Test Fire suppression",
        "categoryParentId": 52,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 182,
        "name": "Mesh free flow dossing sobek",
        "categoryParentId": 53,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 183,
        "name": "Trouble valve free flow dossing",
        "categoryParentId": 53,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 184,
        "name": "Trouble motor free flow dossing",
        "categoryParentId": 53,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 185,
        "name": "Fluid Bed 1 (Otomatis)",
        "categoryParentId": 54,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 186,
        "name": "Pengelasan Body Fluid Bed",
        "categoryParentId": 54,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 187,
        "name": "Setting bandul Fluid Bed",
        "categoryParentId": 54,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 188,
        "name": "Trouble motor Fluid Bed",
        "categoryParentId": 54,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 189,
        "name": "Trouble Bantalan fb",
        "categoryParentId": 54,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 190,
        "name": "Fluid Bed 2 (Otomatis)",
        "categoryParentId": 55,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 191,
        "name": "Perbaikan screen Fluid Bed",
        "categoryParentId": 55,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 192,
        "name": "Flexible FB sobek/diganti",
        "categoryParentId": 55,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 193,
        "name": "Flexible bustle sobek",
        "categoryParentId": 55,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 194,
        "name": "Flexible cooling fan",
        "categoryParentId": 55,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 195,
        "name": "Flexible ducting fb",
        "categoryParentId": 55,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 196,
        "name": "Pengelasan Body Fluid Bed",
        "categoryParentId": 55,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 197,
        "name": "Setting bandul Fluid Bed",
        "categoryParentId": 55,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 198,
        "name": "Trouble motor Fluid Bed",
        "categoryParentId": 55,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 199,
        "name": "Trouble Bantalan fb",
        "categoryParentId": 55,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 200,
        "name": "Perbaikan screen Fluid Bed",
        "categoryParentId": 55,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 201,
        "name": "Flexible FB sobek/diganti",
        "categoryParentId": 55,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 202,
        "name": "Flexible bustle sobek",
        "categoryParentId": 55,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 203,
        "name": "Flexible cooling fan",
        "categoryParentId": 55,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 204,
        "name": "Flexible ducting fb",
        "categoryParentId": 55,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 205,
        "name": "Flexible ke Siever sobek/diganti",
        "categoryParentId": 55,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 206,
        "name": "Sievter (Otomatis)",
        "categoryParentId": 56,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 207,
        "name": "Wire mesh sobek/diganti",
        "categoryParentId": 56,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 208,
        "name": "Rangka/ring mesh patah",
        "categoryParentId": 56,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 209,
        "name": "Trouble motor sieveter",
        "categoryParentId": 56,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 210,
        "name": "Setting bandul sievter",
        "categoryParentId": 56,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 211,
        "name": "Flexible siever ke hopper sobek/diganti",
        "categoryParentId": 56,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 212,
        "name": "Pengelasan body sievter",
        "categoryParentId": 56,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 213,
        "name": "Bongkar Pasang Sievter",
        "categoryParentId": 56,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 214,
        "name": "Trouble valve main hopper",
        "categoryParentId": 57,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 215,
        "name": "Trouble motor screw besar",
        "categoryParentId": 57,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 216,
        "name": "Dudukan motor screw retak/patah",
        "categoryParentId": 57,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 217,
        "name": "Perbaikan cover screw besar",
        "categoryParentId": 57,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 218,
        "name": "Trouble screw besar",
        "categoryParentId": 57,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 219,
        "name": "Trouble rantai putus/lepas",
        "categoryParentId": 57,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 220,
        "name": "Trouble conveyor packing",
        "categoryParentId": 57,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 221,
        "name": "Baut rotary packing 750kg patah",
        "categoryParentId": 57,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 222,
        "name": "Trouble valve weighing",
        "categoryParentId": 57,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 223,
        "name": "Trouble lifting conveyor",
        "categoryParentId": 57,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 224,
        "name": "Trouble motor sliding",
        "categoryParentId": 57,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 225,
        "name": "Trouble gear sliding",
        "categoryParentId": 57,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 226,
        "name": "Trouble valve main hopper",
        "categoryParentId": 58,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 227,
        "name": "Trouble motor screw besar",
        "categoryParentId": 58,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 228,
        "name": "Perbaikan cover screw besar",
        "categoryParentId": 58,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 229,
        "name": "Trouble screw besar",
        "categoryParentId": 58,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 230,
        "name": "Trouble motor screw kecil",
        "categoryParentId": 58,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 231,
        "name": "Trouble screw kecil",
        "categoryParentId": 58,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 232,
        "name": "Trouble weigher",
        "categoryParentId": 58,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 233,
        "name": "Trouble motor vacuum",
        "categoryParentId": 58,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 234,
        "name": "Trouble bag arm",
        "categoryParentId": 58,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 235,
        "name": "Trouble long arm",
        "categoryParentId": 58,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 236,
        "name": "Trouble penjepit zak (bag clamp)",
        "categoryParentId": 58,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 237,
        "name": "Trouble translator",
        "categoryParentId": 58,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 238,
        "name": "Bag placer lepas (trouble magazine)",
        "categoryParentId": 58,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 239,
        "name": "Trouble rantai bag placer",
        "categoryParentId": 58,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 240,
        "name": "Trouble rantai bag cleaning",
        "categoryParentId": 58,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 241,
        "name": "Trouble rantai bag sealing",
        "categoryParentId": 58,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 242,
        "name": "Trouble motor sewing",
        "categoryParentId": 58,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 243,
        "name": "Trouble couple motor sewing",
        "categoryParentId": 58,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 244,
        "name": "Trouble welding/sealing",
        "categoryParentId": 58,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 245,
        "name": "Trouble sewing",
        "categoryParentId": 58,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 246,
        "name": "Jarum patah",
        "categoryParentId": 58,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 247,
        "name": "Trouble motor dust collector",
        "categoryParentId": 58,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 248,
        "name": "Trouble motor conveyor packing",
        "categoryParentId": 58,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 249,
        "name": "Penggantian belt conveyor packing",
        "categoryParentId": 58,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 250,
        "name": "Trouble metal detector",
        "categoryParentId": 58,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 251,
        "name": "Mesin coding rusak",
        "categoryParentId": 58,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 399,
        "name": "Trouble motor supply CIP",
        "categoryParentId": 58,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 399,
        "name": "Trouble pompa return CIP",
        "categoryParentId": 58,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 228,
        "name": "Trouble valve CIP",
        "categoryParentId": 58,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 229,
        "name": "PHE CIP kitchen bocor/rusak",
        "categoryParentId": 58,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 230,
        "name": "Jalur CIP bocor",
        "categoryParentId": 58,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 231,
        "name": "Trouble vacuum sensor",
        "categoryParentId": 14,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 232,
        "name": "Trouble Promass",
        "categoryParentId": 14,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 233,
        "name": "Sequence scanima error",
        "categoryParentId": 14,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 234,
        "name": "Trip motor scanima",
        "categoryParentId": 14,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 235,
        "name": "Trip motor vacuum",
        "categoryParentId": 14,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 236,
        "name": "Sensor LV scanima error",
        "categoryParentId": 14,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 237,
        "name": "Trip Motor Fuel Pump",
        "categoryParentId": 31,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 238,
        "name": "Trip motor balance tank",
        "categoryParentId": 31,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 239,
        "name": "Trip Common Error",
        "categoryParentId": 32,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 240,
        "name": "Trip seal water",
        "categoryParentId": 32,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 241,
        "name": "Trip FME",
        "categoryParentId": 32,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 242,
        "name": "Trip Homogenizer Pressure Low",
        "categoryParentId": 32,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 243,
        "name": "Trip upper pressure",
        "categoryParentId": 32,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 244,
        "name": "Trip Main Motor Alarm",
        "categoryParentId": 32,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 245,
        "name": "Control homo error",
        "categoryParentId": 32,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 246,
        "name": "Trip Pressure oil",
        "categoryParentId": 32,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 247,
        "name": "Trip Common error",
        "categoryParentId": 34,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 248,
        "name": "Trip seal water",
        "categoryParentId": 34,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 249,
        "name": "Trip FME",
        "categoryParentId": 34,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 250,
        "name": "Trip upper pressure",
        "categoryParentId": 34,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 251,
        "name": "Trip Motor Feed pump",
        "categoryParentId": 34,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 252,
        "name": "Control HPP Error",
        "categoryParentId": 34,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 253,
        "name": "Trip Pressure Low",
        "categoryParentId": 34,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 254,
        "name": "Trip Pressure Oil",
        "categoryParentId": 34,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 255,
        "name": "Trip overheat",
        "categoryParentId": 34,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 256,
        "name": "Trip Main Motor Alarm",
        "categoryParentId": 34,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 257,
        "name": "Trip Maximator",
        "categoryParentId": 35,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 258,
        "name": "Program Error",
        "categoryParentId": 64,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 259,
        "name": "Fire suppression panel off",
        "categoryParentId": 64,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 260,
        "name": "Panel Mixing Error",
        "categoryParentId": 64,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 261,
        "name": "Emergency panel blending",
        "categoryParentId": 64,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 262,
        "name": "Emergency panel cip",
        "categoryParentId": 64,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 263,
        "name": "Emergency panel Reception",
        "categoryParentId": 64,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 264,
        "name": "Trouble Monitor Control Room",
        "categoryParentId": 64,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 265,
        "name": "System error",
        "categoryParentId": 64,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 266,
        "name": "Trouble PLC",
        "categoryParentId": 64,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 267,
        "name": "Trouble UPS burner",
        "categoryParentId": 37,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 268,
        "name": "Low diffusion",
        "categoryParentId": 37,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 269,
        "name": "Trip ZS 613",
        "categoryParentId": 37,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 270,
        "name": "Burner Control Error",
        "categoryParentId": 37,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 271,
        "name": "Trip sensor PSL Burner",
        "categoryParentId": 37,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 272,
        "name": "Trip Common error",
        "categoryParentId": 66,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 273,
        "name": "Trip FME",
        "categoryParentId": 66,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 274,
        "name": "Trip DPZ 613",
        "categoryParentId": 66,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 275,
        "name": "Trip Motor Protecting Switch",
        "categoryParentId": 66,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 276,
        "name": "Trip Common error",
        "categoryParentId": 67,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 277,
        "name": "Trip Motor Protecting Switch",
        "categoryParentId": 67,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 278,
        "name": "Trouble Sensor",
        "categoryParentId": 67,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 279,
        "name": "Feedback Monitoring",
        "categoryParentId": 67,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 280,
        "name": "Trip Motor Desiccant",
        "categoryParentId": 68,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 281,
        "name": "Trip PIC low limited",
        "categoryParentId": 69,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 282,
        "name": "Trip PIC Upper limited",
        "categoryParentId": 69,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 283,
        "name": "Trip interlock PIC",
        "categoryParentId": 69,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 284,
        "name": "TI 02 Common error",
        "categoryParentId": 69,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 285,
        "name": "Trip PSL 01",
        "categoryParentId": 69,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 286,
        "name": "Trip PSL 02",
        "categoryParentId": 69,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 287,
        "name": "Trip PSL 05",
        "categoryParentId": 69,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 288,
        "name": "Trip ZS Explosive door",
        "categoryParentId": 69,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 289,
        "name": "Trouble Solenoid Impactor",
        "categoryParentId": 69,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 290,
        "name": "Trip Fire Suppression",
        "categoryParentId": 69,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 291,
        "name": "Trouble Fire suppression",
        "categoryParentId": 69,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 292,
        "name": "Pressure chamber ngacak",
        "categoryParentId": 69,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 293,
        "name": "Trip Motor Regent Blower",
        "categoryParentId": 70,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 294,
        "name": "Trip Motor Dehum",
        "categoryParentId": 71,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 295,
        "name": "Trip Motor Lobe Blower Protecting Switch",
        "categoryParentId": 72,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 296,
        "name": "Trip motor lobe blower",
        "categoryParentId": 72,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 297,
        "name": "Trip motor cooling Fan",
        "categoryParentId": 73,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 298,
        "name": "Trip Motor Rotary Primary",
        "categoryParentId": 74,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 299,
        "name": "Trip Motor Rotary Secondary",
        "categoryParentId": 74,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 300,
        "name": "Trip Motor Cyclone fluid bed",
        "categoryParentId": 74,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 301,
        "name": "Penggantian GV/MCB Motor Vibro",
        "categoryParentId": 75,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 302,
        "name": "Trip Motor Vibro",
        "categoryParentId": 75,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 303,
        "name": "Trip Motor Shifter",
        "categoryParentId": 76,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 303,
        "name": "Sistem fault",
        "categoryParentId": 77,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 304,
        "name": "trouble valve hopper",
        "categoryParentId": 77,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 305,
        "name": "Trouble sensor",
        "categoryParentId": 77,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 306,
        "name": "Trouble conveyor",
        "categoryParentId": 77,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 307,
        "name": "Sistem fault",
        "categoryParentId": 78,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 308,
        "name": "trouble valve hopper",
        "categoryParentId": 78,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 309,
        "name": "Trouble Sensor",
        "categoryParentId": 78,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 310,
        "name": "Emergency Pressed",
        "categoryParentId": 78,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 311,
        "name": "Trouble Motor Vacuum Bag Magazine",
        "categoryParentId": 78,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 312,
        "name": "Trip Motor Screw Besar",
        "categoryParentId": 79,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 313,
        "name": "Trip Motor Screw Kecil",
        "categoryParentId": 79,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 314,
        "name": "Trip Emergency",
        "categoryParentId": 81,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 315,
        "name": "Trip Motor Conveyor",
        "categoryParentId": 81,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 316,
        "name": "Startup",
        "categoryParentId": 15,
        "unit": "kg",
        "categoryType": "manualcollection"
      },
      {
        "id": 317,
        "name": "Shortage liquid",
        "categoryParentId": 23,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 318,
        "name": "Ganti ukuran nozzle",
        "categoryParentId": 23,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 319,
        "name": "Blocking di bustle",
        "categoryParentId": 23,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 320,
        "name": "Blocking di fluid bed",
        "categoryParentId": 23,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 321,
        "name": "Powder numpuk di fluid bed",
        "categoryParentId": 23,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 322,
        "name": "Blocking di primary cyclone",
        "categoryParentId": 23,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 323,
        "name": "Blocking di secondary cyclone",
        "categoryParentId": 23,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 324,
        "name": "Blocking di jalur fine return",
        "categoryParentId": 23,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 325,
        "name": "Numpuk di sievter",
        "categoryParentId": 23,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 326,
        "name": "Shortage RM",
        "categoryParentId": 23,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 327,
        "name": "Shortage PM",
        "categoryParentId": 23,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 328,
        "name": "Gudang penuh",
        "categoryParentId": 23,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 329,
        "name": "Ganti product",
        "categoryParentId": 23,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 330,
        "name": "Release Deposit Bustle",
        "categoryParentId": 23,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 331,
        "name": "Penumpukan di cyclone FB",
        "categoryParentId": 23,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 332,
        "name": "Dry cleaning",
        "categoryParentId": 24,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 333,
        "name": "CIP",
        "categoryParentId": 24,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 334,
        "name": "Shortage RM",
        "categoryParentId": 25,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 335,
        "name": "Shortage PM",
        "categoryParentId": 25,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 336,
        "name": "Shortage Palet",
        "categoryParentId": 25,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 337,
        "name": "Gudang penuh",
        "categoryParentId": 25,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 338,
        "name": "Target (kg/h)",
        "categoryParentId": 17,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 339,
        "name": "Slow Down (speed Homo L/h)",
        "categoryParentId": 26,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 340,
        "name": "Others",
        "categoryParentId": 26,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 341,
        "name": "Burning particle/kotor",
        "categoryParentId": 27,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 342,
        "name": "Browning",
        "categoryParentId": 27,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 343,
        "name": "Dusty",
        "categoryParentId": 27,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 344,
        "name": "Rasa tidak normal",
        "categoryParentId": 27,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 345,
        "name": "Fatty Eyes",
        "categoryParentId": 27,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 346,
        "name": "BD Rendah",
        "categoryParentId": 27,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 347,
        "name": "Bentuk tidak standar",
        "categoryParentId": 27,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 348,
        "name": "Kontaminasi benda asing",
        "categoryParentId": 27,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 349,
        "name": "Powder yang di hold",
        "categoryParentId": 27,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 350,
        "name": "Fat content/Tinggi/rendah",
        "categoryParentId": 27,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 351,
        "name": "BD tinggi",
        "categoryParentId": 27,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 352,
        "name": "BP hitam",
        "categoryParentId": 27,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 353,
        "name": "Seduhan gelap",
        "categoryParentId": 27,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 354,
        "name": "Tinggi foam",
        "categoryParentId": 27,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 355,
        "name": "White dots",
        "categoryParentId": 27,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 356,
        "name": "Stabilitas",
        "categoryParentId": 27,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 357,
        "name": "Kemasan sobek/basah",
        "categoryParentId": 27,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 358,
        "name": "Gumpalan powder diluar inner",
        "categoryParentId": 27,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 359,
        "name": "Burning particle/kotor",
        "categoryParentId": 28,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 360,
        "name": "Browning",
        "categoryParentId": 28,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 361,
        "name": "Dusty",
        "categoryParentId": 28,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 362,
        "name": "Rasa tidak normal",
        "categoryParentId": 28,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 363,
        "name": "Fatty Eyes",
        "categoryParentId": 28,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 364,
        "name": "BD Rendah",
        "categoryParentId": 28,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 365,
        "name": "Bentuk tidak standar",
        "categoryParentId": 28,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 366,
        "name": "Kontaminasi benda asing",
        "categoryParentId": 28,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 367,
        "name": "Powder yang di hold",
        "categoryParentId": 28,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 368,
        "name": "Fat content/Tinggi/rendah",
        "categoryParentId": 28,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 369,
        "name": "BD tinggi",
        "categoryParentId": 28,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 370,
        "name": "BP hitam",
        "categoryParentId": 28,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 371,
        "name": "Seduhan gelap",
        "categoryParentId": 28,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 372,
        "name": "Tinggi foam",
        "categoryParentId": 28,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 373,
        "name": "White dots",
        "categoryParentId": 28,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 374,
        "name": "Stabilitas",
        "categoryParentId": 28,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 375,
        "name": "Kemasan sobek/basah",
        "categoryParentId": 28,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 376,
        "name": "Gumpalan powder diluar inner",
        "categoryParentId": 28,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 377,
        "name": "Kemasan Kotor",
        "categoryParentId": 28,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 378,
        "name": "Return Kena Oil",
        "categoryParentId": 28,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 379,
        "name": "Burning particle/kotor",
        "categoryParentId": 82,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 380,
        "name": "Browning",
        "categoryParentId": 82,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 381,
        "name": "Dusty",
        "categoryParentId": 82,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 382,
        "name": "Rasa tidak normal",
        "categoryParentId": 82,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 383,
        "name": "Fatty Eyes",
        "categoryParentId": 82,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 384,
        "name": "BD Rendah",
        "categoryParentId": 82,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 385,
        "name": "Bentuk tidak standar",
        "categoryParentId": 82,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 386,
        "name": "Kontaminasi benda asing",
        "categoryParentId": 82,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 387,
        "name": "Powder yang di hold",
        "categoryParentId": 82,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 388,
        "name": "Fat content/Tinggi/rendah",
        "categoryParentId": 82,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 389,
        "name": "BD tinggi",
        "categoryParentId": 82,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 390,
        "name": "BP hitam",
        "categoryParentId": 82,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 391,
        "name": "Seduhan gelap",
        "categoryParentId": 82,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 392,
        "name": "Tinggi foam",
        "categoryParentId": 82,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 393,
        "name": "White dots",
        "categoryParentId": 82,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 394,
        "name": "Stabilitas",
        "categoryParentId": 82,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 395,
        "name": "Kemasan sobek/basah",
        "categoryParentId": 82,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 396,
        "name": "Gumpalan powder diluar inner",
        "categoryParentId": 82,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 397,
        "name": "Kemasan Kotor",
        "categoryParentId": 82,
        "unit": "kg",
        "categoryType": "trouble"
      },
      {
        "id": 398,
        "name": "Release",
        "categoryParentId": 14,
        "unit": "kg",
        "categoryType": "trouble"
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Add your seed undo logic here
    await queryInterface.bulkDelete('MstCategory', null, {});
    await queryInterface.bulkDelete('MstCategoryParent', null, {});
  },
};
