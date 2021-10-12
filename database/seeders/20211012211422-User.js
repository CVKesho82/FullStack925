'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
    firstName:'Scott',
    lastName:'Henderson',
    email:'scott.mc.henderson@gmail.com',
    hash: '$2b$10$ihhTXV0ELAaPZgRuK0gZFenyXN03V7uYzuoSvPmLOFvOMBPQQ9Tri',
    createdAt: new Date(),
    updatedAt: new Date(),
    }],{});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
