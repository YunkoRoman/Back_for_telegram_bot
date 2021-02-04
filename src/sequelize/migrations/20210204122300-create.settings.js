/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('chat_bot_settings', {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    value: new Sequelize.DataTypes.STRING(128),
    updatedAt: Sequelize.DataTypes.DATE,
    createdAt: Sequelize.DataTypes.DATE,
  }),

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('chat_bot_settings');
  },
};
