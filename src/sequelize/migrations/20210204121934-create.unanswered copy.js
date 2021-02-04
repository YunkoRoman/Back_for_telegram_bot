/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('chat_bot_unanswered', {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    question: {
      type: new Sequelize.DataTypes.STRING(128),
      allowNull: false,
    },
    stats: {
      type: Sequelize.DataTypes.INTEGER,
    },
    updatedAt: Sequelize.DataTypes.DATE,
    createdAt: Sequelize.DataTypes.DATE,
  }),

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('chat_bot_unanswered');
  },
};
