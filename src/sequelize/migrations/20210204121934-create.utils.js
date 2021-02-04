module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.createTable('chat_bot_answered_questions', {
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
    },
    { transaction: t }),
  ])),

  down: async (queryInterface, Sequelize) => {
    queryInterface.sequelize.transaction((t) => Promise.all([
      queryInterface.dropTable('chat_bot_answered_questions', { transaction: t }),
    ]));
  },
};
