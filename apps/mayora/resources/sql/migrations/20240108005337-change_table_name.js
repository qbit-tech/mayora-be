'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.renameTable('MstUser', 'users');
    queryInterface.renameTable('MstRole', 'roles');
  },

  async down(queryInterface, Sequelize) {
  }
};
