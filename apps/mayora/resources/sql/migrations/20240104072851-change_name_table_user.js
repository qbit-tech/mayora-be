'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.renameTable('users', 'MstUser');
    queryInterface.renameTable('roles', 'MstRole');
  },

  async down(queryInterface, Sequelize) {
  }
};