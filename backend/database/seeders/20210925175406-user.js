'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
        firstName: 'Annie',
        lastName: 'Easley',
        email: 'ajeasley@nasa.gov',
        createdAt: new Date(),
        updatedAt: new Date(),
        hash: "$2b$10$H3.Dnu6kScUl2QdxjKtX2OKIVq2zY8F2a7GPL1Z2cCHZAbbNNtcji"
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
