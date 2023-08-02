'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', { 
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      transaction_id: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      account_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'accounts',
          key: 'id',
        }
      },
      date: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      value: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      cashback: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
    });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('transactions');
  }
};
