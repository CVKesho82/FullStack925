'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
        firstName: 'new',
        lastName: 'user',
        email: 'test@gmail.com',
        hash: '$2b$10$2j08oLCDaIoNN0meBMj96uA4AVmlAYRmePrmLWZrgHEjm.OENpjb6',
        createdAt: new Date(),
        updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('People', null, {});
  }
};
