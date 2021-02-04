/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('chat_bot_faqs', {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    question: new Sequelize.DataTypes.STRING(128),
    answer: new Sequelize.DataTypes.STRING(128),
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
