/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('chat_bot_faqs', {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    question: new Sequelize.DataTypes.TEXT('long'),
    answer: new Sequelize.DataTypes.TEXT('long'),
    intentName: new Sequelize.DataTypes.TEXT('long'),
    stats: {
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 0,
    },
    updatedAt: Sequelize.DataTypes.DATE,
    createdAt: Sequelize.DataTypes.DATE,
  }),

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('chat_bot_faqs');
  },
};
