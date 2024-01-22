'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Releases', 'shift');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('Releases', 'shift', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  }
};
