'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Answers', [{
      answer: "You should change your oil every 5000-7000 miles",
      forumQuestions_id: 1,
      User_id: 1,
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
