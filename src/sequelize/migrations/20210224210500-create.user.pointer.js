module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'chat_bot_users',
      'pointer',
      {
        type: Sequelize.DataTypes.STRING(128),
        allowNull: true,
      },
    );
  },

  down(queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'chat_bot_users',
      'pointer',
    );
  },
};
