'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('accounts', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      cpf: {
        allowNull: true,
        type: Sequelize.NUMBER,
      },
      cnpj: {
        allowNull: true,
        type: Sequelize.NUMBER,
      },
      status: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
    });

  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('accounts');
  }
};
