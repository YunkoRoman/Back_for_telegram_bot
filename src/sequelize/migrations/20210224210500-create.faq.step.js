module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'chat_bot_faqs',
      'step',
      {
        type: Sequelize.DataTypes.JSON,
        allowNull: true,
      },
    );
  },

  down(queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'chat_bot_faqs',
      'step',
    );
  },
};
