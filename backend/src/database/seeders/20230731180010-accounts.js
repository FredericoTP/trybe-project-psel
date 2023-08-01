'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('accounts', [
      {
        name: 'Ichigo Kurosaki',
        email: 'ichigo.kurosaki@email.com',
        password: '1234567',
        document: '123475781-10',
        status: 1,
      },
      {
        name: 'Naruto Uzumaki',
        email: 'naruto@email.com',
        password: 'abcdefg',
        document: '123475782-10',
        status: 0,
      },
      {
        name: 'Asada Shino',
        email: 'sinon@email.com',
        password: '1234321',
        document: '123475789-10',
        status: 1,
      },
    ], {});
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('accounts', null, {});
  }
};
