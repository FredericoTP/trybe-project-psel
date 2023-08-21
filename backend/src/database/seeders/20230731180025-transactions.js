'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('transactions', [
      {
        transaction_id: '123123123345453567765734',
        account_id: 1,
        date: '2023-03-09T09:23:58.000Z',
        value: 105.30,
        cashback: 0.02,
      },
      {
        transaction_id: '897609876572398740237613',
        account_id: 3,
        date: '2023-03-10T09:23:58.000Z',
        value: 532.27,
        cashback: 0.025,
      },
      {
        transaction_id: '543687200954763209801235',
        account_id: 1,
        date: '2023-03-09T09:23:58.000Z',
        value: 1024.47,
        cashback: 0.03,
      },
    ], {});
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('transactions', null, {});
  }
};
