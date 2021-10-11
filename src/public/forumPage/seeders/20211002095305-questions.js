'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('forumQuestions',[{
      topic:'Cars',
      question:'How often should I change my oil?',
      createdAt:new Date(),
      updatedAt:new Date(),
  },
  {
      topic:'Cars',
      question:'How much air should I put in my tires?',
      createdAt:new Date(),
      updatedAt:new Date(),
  },
  {
    topic:'Cars',
    question:'What percentage of my income should be spent on a car?',
    createdAt:new Date(),
    updatedAt:new Date(),
},
{
    topic:'Cars',
    question:'What percentage of my income should be spent on a car?',
    createdAt:new Date(),
    updatedAt:new Date(),
},
{
    topic:'Cars',
    question:'What is the best time of year to buy a car?',
    createdAt:new Date(),
    updatedAt:new Date(),
},
{
    topic:'Cars',
    question:'Should I pay cash for a new car?',
    createdAt:new Date(),
    updatedAt:new Date(),
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
