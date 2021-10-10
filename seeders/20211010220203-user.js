'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      firstName: 'root',
      lastName: 'user',
      email: 'test@gmail.com',
      hash: '$2b$10$2j08oLCDaIoNN0meBMj96uA4AVmlAYRmePrmLWZrgHEjm.OENpjb6',
      createdAt: new Date(),
      updatedAt: new Date()
  }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('People', null, {});
  }
};
