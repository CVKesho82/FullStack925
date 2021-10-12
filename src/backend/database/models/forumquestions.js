'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class forumQuestions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // forumQuestions.belongsTo(models.User);
      // forumQuestions.hasMany(models.Answers);
      // // define association here
    }
  };
  forumQuestions.init({
    topic: DataTypes.STRING,
    question: DataTypes.STRING, 
    User_id: DataTypes.INTEGER,
    Answers_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'forumQuestions',
  });
  return forumQuestions;
};