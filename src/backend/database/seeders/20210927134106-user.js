'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      firstName: 'Scott',
      lastName: 'Henderson',
      email: 'scott.mc.henderson@gmail.com',
      country: 'USA',
      createdAt: new Date(),
      updatedAt: new Date(),
      hash: "$2b$10$ihhTXV0ELAaPZgRuK0gZFenyXN03V7uYzuoSvPmLOFvOMBPQQ9Tri"
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
