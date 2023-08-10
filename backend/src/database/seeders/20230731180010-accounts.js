'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('accounts', [
      {
        name: 'Ichigo Kurosaki',
        email: 'ichigo.kurosaki@email.com',
        password: '$2a$10$xgJAoOUVE.v1Iy6WwY/4dOHr7.r2P7oxLOTxaOhgZPOs/3CZCb7e6', // 1234567
        document: '472.360.750-19',
        status: 1,
      },
      {
        name: 'Naruto Uzumaki',
        email: 'naruto@email.com',
        password: '$2a$10$NPFQ46xzrI2zQL5hLQ3nauXCTFzRU/hbT8fvr1cuK3vBJAbWsPMnW', // abcdefg
        document: '667.766.210-12',
        status: 0,
      },
      {
        name: 'Asada Shino',
        email: 'sinon@email.com',
        password: '$2a$10$UcxoNCw1uTf1Czuq3TS80.J/R5ERMNhmsjjwc4jQJ1GDE5z.2u99y', // 1234321
        document: '88.615.552/0001-55',
        status: 1,
      },
    ], {});
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('accounts', null, {});
  }
};
