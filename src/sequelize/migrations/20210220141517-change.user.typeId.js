module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeConstraint(
        'chat_bot_users',
        'chat_bot_users_typeId_fkey',
        { transaction },
      );
      await queryInterface.changeColumn(
        'chat_bot_users',
        'typeId',
        {
          type: Sequelize.DataTypes.STRING(128),
          allowNull: true,
        },
        { transaction },
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeConstriant(
        'chat_bot_users',
        'chat_bot_users_typeId_fkey',
        { transaction },
      );
      await queryInterface.changeColumn('chat_bot_users', 'typeId', { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
<<<<<<<<< Temporary merge branch 1
};
=========
};
>>>>>>>>> Temporary merge branch 2
